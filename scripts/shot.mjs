#!/usr/bin/env node
/**
 * Takes desktop and phone screenshots with the installed Edge or Chrome, and checks each page for
 * sideways scrolling and for exactly one h1. Needs Node 22 or later and no packages.
 *
 *   node scripts/shot.mjs                         all four pages
 *   node scripts/shot.mjs home pricing            only these pages
 *   node scripts/shot.mjs --out some/dir book     somewhere other than .impeccable/review
 *   node scripts/shot.mjs --wait 15000 book       give a slow embed longer to load
 *   node scripts/shot.mjs --settle 8000 book      grow the screen to the page's height and wait before the
 *                                                        full-page shot, because an embed re-animates when resized
 *   node scripts/shot.mjs --size 320x640 pricing  this size only, written as pricing-320x640.png
 *   node scripts/shot.mjs --block "*cal.com*" book  make requests to these URLs fail (repeatable)
 *   node scripts/shot.mjs --eval "code" contact   run this in the page before capturing, and print the result
 *   node scripts/shot.mjs --eval-file a.js contact  the same, with the code in a file
 *
 * Pages are names, not paths, because Git Bash rewrites arguments like /pricing into Windows paths.
 * Exits 1 if a page fails a check, or 2 if it can't load the pages at all.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const browsers = [
  process.env.BROWSER_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].filter(Boolean);

const viewports = [
  { name: "desktop", width: 1440, height: 900, mobile: false },
  { name: "mobile", width: 390, height: 844, mobile: true },
];

function parseArgs(argv) {
  const options = { out: ".impeccable/review", base: "http://localhost:3111", wait: 2_000, pages: [], block: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--out") options.out = argv[++i];
    else if (argv[i] === "--base") options.base = argv[++i];
    else if (argv[i] === "--wait") options.wait = Number(argv[++i]);
    else if (argv[i] === "--settle") options.settle = Number(argv[++i]);
    else if (argv[i] === "--size") options.size = argv[++i];
    else if (argv[i] === "--block") options.block.push(argv[++i]);
    else if (argv[i] === "--eval") options.eval = argv[++i];
    else if (argv[i] === "--eval-file") options.eval = readFileSync(argv[++i], "utf8");
    else options.pages.push(argv[i]);
  }
  if (options.size) {
    const [width, height] = options.size.split("x").map(Number);
    options.viewports = [{ name: options.size, width, height, mobile: width < 768 }];
  } else {
    options.viewports = viewports;
  }
  if (options.pages.length === 0) options.pages = ["home", "pricing", "book", "contact"];
  return options;
}

const pagePath = (page) => (page === "home" ? "/" : `/${page}`);
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

/** Starts the browser and resolves with its DevTools address, which it writes to a file in the profile. */
async function startBrowser(executable, profile) {
  const child = spawn(
    executable,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--remote-debugging-port=0",
      `--user-data-dir=${profile}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );
  const portFile = join(profile, "DevToolsActivePort");
  for (let waited = 0; waited < 30_000; waited += 200) {
    if (existsSync(portFile)) {
      const [port, path] = readFileSync(portFile, "utf8").split(/\r?\n/);
      if (port && path) return { child, address: `ws://127.0.0.1:${port}${path}` };
    }
    await sleep(200);
  }
  child.kill();
  throw new Error("the browser didn't start in 30 seconds");
}

/** A small DevTools protocol client over Node's built-in WebSocket. */
async function connect(address) {
  const socket = new WebSocket(address);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", () => reject(new Error("couldn't connect to the browser")), { once: true });
  });

  let nextId = 1;
  const pending = new Map();
  const listeners = new Set();
  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    const waiting = pending.get(message.id);
    if (waiting) {
      pending.delete(message.id);
      if (message.error) waiting.reject(new Error(message.error.message));
      else waiting.resolve(message.result);
    } else {
      for (const listener of listeners) listener(message);
    }
  });

  return {
    send: (method, params = {}, sessionId) =>
      new Promise((resolve, reject) => {
        const id = nextId++;
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params, sessionId }));
      }),
    onEvent: (listener) => listeners.add(listener),
    offEvent: (listener) => listeners.delete(listener),
  };
}

/** Resolves when the page has loaded. Slow third-party embeds shouldn't hold up the run forever. */
function waitForLoad(cdp, sessionId, timeoutMs = 45_000) {
  return new Promise((resolve) => {
    const finish = () => {
      clearTimeout(timer);
      cdp.offEvent(listener);
      resolve();
    };
    const listener = (message) => {
      if (message.sessionId === sessionId && message.method === "Page.loadEventFired") finish();
    };
    const timer = setTimeout(finish, timeoutMs);
    cdp.onEvent(listener);
  });
}

async function capture(cdp, sessionId, viewport, settle) {
  // Capturing beyond the viewport resizes the page to the clip, which can make an embed lay out again.
  const screenshot = async (clip, beyondViewport = true) => {
    const { data } = await cdp.send(
      "Page.captureScreenshot",
      { format: "png", captureBeyondViewport: beyondViewport, clip: { ...clip, x: 0, y: 0, scale: 1 } },
      sessionId,
    );
    return Buffer.from(data, "base64");
  };
  const { cssContentSize } = await cdp.send("Page.getLayoutMetrics", {}, sessionId);
  // The fold goes first: a capture taller than the screen resizes the page, which can move embeds.
  const fold = await screenshot({ width: viewport.width, height: viewport.height });
  if (settle) {
    await cdp.send(
      "Emulation.setDeviceMetricsOverride",
      { width: viewport.width, height: Math.ceil(cssContentSize.height), deviceScaleFactor: 1, mobile: viewport.mobile },
      sessionId,
    );
    await sleep(settle);
  }
  return {
    // With --settle the screen already holds the whole page, so the shot doesn't need to resize it.
    full: await screenshot({ width: viewport.width, height: Math.ceil(cssContentSize.height) }, !settle),
    fold,
    height: Math.ceil(cssContentSize.height),
  };
}

async function shootPage(cdp, sessionId, options, page, viewport) {
  await cdp.send(
    "Emulation.setDeviceMetricsOverride",
    { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.mobile },
    sessionId,
  );
  const loaded = waitForLoad(cdp, sessionId);
  const url = new URL(pagePath(page), options.base).href;
  const { errorText } = await cdp.send("Page.navigate", { url }, sessionId);
  if (errorText) throw new Error(`${url}: ${errorText}`);
  await loaded;
  await sleep(options.wait); // Let fonts and embeds settle.

  if (options.eval) {
    const { result: evaluated, exceptionDetails } = await cdp.send(
      "Runtime.evaluate",
      { expression: options.eval, returnByValue: true, awaitPromise: true },
      sessionId,
    );
    console.log(`eval: ${exceptionDetails ? exceptionDetails.exception?.description : JSON.stringify(evaluated.value)}`);
    await sleep(options.wait); // Let the page respond to whatever that did.
  }

  const { result } = await cdp.send(
    "Runtime.evaluate",
    {
      returnByValue: true,
      // The Next.js dev badge isn't part of the site, so keep it out of the screenshots.
      expression: `document.querySelector("nextjs-portal")?.remove(), ({
        // innerWidth grows with the overflow on a phone, so measure against the layout width instead.
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        h1s: document.querySelectorAll("h1").length,
      })`,
    },
    sessionId,
  );
  const { overflow, h1s } = result.value;

  const name = `${page.replaceAll("/", "-")}-${viewport.name}`;
  const { full, fold, height } = await capture(cdp, sessionId, viewport, options.settle);
  writeFileSync(join(options.out, `${name}.png`), full);
  writeFileSync(join(options.out, `${name}-fold.png`), fold);

  const problems = [];
  if (overflow > 0) problems.push(`scrolls sideways by ${overflow}px`);
  if (h1s !== 1) problems.push(`has ${h1s} h1 elements`);
  console.log(`${name}: ${viewport.width}x${height}${problems.length ? `  PROBLEM: ${problems.join(", ")}` : "  ok"}`);
  return problems.length;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const executable = browsers.find((path) => existsSync(path));
  if (!executable) throw new Error("no Edge or Chrome found; set BROWSER_PATH");
  mkdirSync(options.out, { recursive: true });

  const profile = mkdtempSync(join(tmpdir(), "saigon-shot-"));
  const { child, address } = await startBrowser(executable, profile);
  let problems = 0;
  let cdp;
  try {
    cdp = await connect(address);
    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
    await cdp.send("Page.enable", {}, sessionId);
    if (options.block.length > 0) {
      await cdp.send("Network.enable", {}, sessionId);
      await cdp.send("Network.setBlockedURLs", { urls: options.block }, sessionId);
    }
    // Screenshots must show the finished page, not one caught halfway through an entrance animation.
    await cdp.send(
      "Emulation.setEmulatedMedia",
      { features: [{ name: "prefers-reduced-motion", value: "reduce" }] },
      sessionId,
    );
    for (const page of options.pages) {
      for (const viewport of options.viewports) problems += await shootPage(cdp, sessionId, options, page, viewport);
    }
  } finally {
    // Ask the browser to close, even after an error. On Windows, killing the process we started
    // can leave Edge's real browser process running.
    if (cdp) await Promise.race([cdp.send("Browser.close").catch(() => {}), sleep(3_000)]);
    child.kill();
    await sleep(1_000);
    // Windows can hold the profile a little longer. It's in the temp folder, so leaving it is harmless.
    try {
      rmSync(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 500 });
    } catch {}
  }
  console.log(`Screenshots are in ${options.out}`);
  process.exit(problems ? 1 : 0);
}

main().catch((error) => {
  console.error(`shot.mjs: ${error.message}`);
  process.exit(2);
});
