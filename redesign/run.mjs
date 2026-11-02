#!/usr/bin/env node
/**
 * Runs the redesign one step at a time. Each step is a Claude Code session working from a file in
 * redesign/steps. After each session this script runs the checks and commits, so a rerun carries on
 * from the first step without a commit. See redesign/README.md.
 *
 *   node redesign/run.mjs                every step that isn't done yet
 *   node redesign/run.mjs --status       what's done and what's next
 *   node redesign/run.mjs --only 05      just this step
 *   node redesign/run.mjs --check 05     checks and commit only, after doing a step by hand
 *   node redesign/run.mjs --unattended   don't stop to choose the direction: take the one Impeccable rolls
 *
 * Other options: --max-budget <usd> per session (default 25), --model <name>.
 */
import { spawn, spawnSync } from "node:child_process";
import { createWriteStream, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logs = join(root, "redesign", "logs");
const windows = process.platform === "win32";

const branch = "redesign/impeccable";
const impeccableVersion = "4.8.0";
// 16.3.8 has critical advisories (GHSA-2464-fhr4-w9xw, GHSA-673q-mjm6-r5xr, GHSA-p3m5-59mp-jv5r), fixed in 16.4.1.
const nextVersion = "16.4.3";
const port = 3111;
const pages = ["home", "pricing", "book", "contact"];
const pageUrls = pages.map((page) => `http://localhost:${port}/${page === "home" ? "" : page}`).join(" ");
const quietLimitMs = 20 * 60 * 1000;

const impeccable = windows
  ? ".claude\\skills\\impeccable\\scripts\\impeccable.cmd"
  : ".claude/skills/impeccable/scripts/impeccable";

const steps = [
  { id: "01", title: "setup", kind: "script" },
  { id: "02", title: "direction", kind: "direction" },
  { id: "03", title: "foundations", kind: "session" },
  { id: "04", title: "home", kind: "session" },
  { id: "05", title: "pricing", kind: "session" },
  { id: "06", title: "book", kind: "session" },
  { id: "07", title: "contact", kind: "session" },
  { id: "08", title: "critique", kind: "session", strictDetector: true },
  { id: "09", title: "project-audits", kind: "session", strictDetector: true },
  { id: "10", title: "finish", kind: "session", strictDetector: true },
];

/** The redesign only changes how the site looks. These files must come out of every step unchanged. */
const protectedPaths = [
  "package.json",
  "package-lock.json",
  "next.config.ts",
  ".env.example",
  "CLAUDE.md",
  "GUIDE.md",
  "docs",
  "src/lib",
  "src/app/contact/actions.ts",
  "src/components/contact/Turnstile.tsx",
];

const bannedCopy =
  /\b(elevate|unlock|seamless|curated|bespoke experience|timeless elegance|tailored to perfection|fast-paced world|whether you're|made in australia)\b/i;

const allowedTools = [
  "Read",
  "Edit",
  "Write",
  "Glob",
  "Grep",
  "Skill",
  "Agent",
  "TodoWrite",
  "Bash(.claude/skills/impeccable/scripts/impeccable *)",
  "Bash(*/.claude/skills/impeccable/scripts/impeccable *)",
  "Bash(npm run lint*)",
  "Bash(npm run build*)",
  "Bash(npm audit*)",
  "Bash(npm ls*)",
  "Bash(npx tsc --noEmit*)",
  "Bash(npx eslint*)",
  "Bash(node redesign/tools/shot.mjs*)",
  "Bash(git status*)",
  "Bash(git diff*)",
  "Bash(git log*)",
  "Bash(git show*)",
  `Bash(curl -s http://localhost:${port}*)`,
  `Bash(curl -s * http://localhost:${port}*)`,
  "Bash(ls*)",
  "Bash(mkdir -p .impeccable*)",
  "Bash(rm src/*)",
  "Bash(rm -f src/*)",
  "Bash(rm .impeccable/*)",
  "Bash(rm -f .impeccable/*)",
].join(" ");

/** With nobody at the keyboard these would hang the session or skip the choice the owner already made. */
const unattendedBans = ["PowerShell", "AskUserQuestion", "Bash(*impeccable serve-question*)", "Bash(*impeccable generate-image*)"];
const buildBans = [...unattendedBans, "Bash(*impeccable concept-seed*)"].join(" ");

function parseArgs(argv) {
  const options = { budget: 25, model: null, only: null, check: null, status: false, unattended: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--status") options.status = true;
    else if (arg === "--unattended") options.unattended = true;
    else if (arg === "--only") options.only = argv[++i];
    else if (arg === "--check") options.check = argv[++i];
    else if (arg === "--model") options.model = argv[++i];
    else if (arg === "--max-budget") options.budget = Number(argv[++i]);
    else throw new Error(`Unknown option: ${arg}. The options are listed at the top of redesign/run.mjs.`);
  }
  if (!(options.budget > 0)) throw new Error("--max-budget needs a dollar amount, e.g. --max-budget 40");
  return options;
}

const tail = (text, lines = 30) => text.trim().split(/\r?\n/).slice(-lines).join("\n");
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

/** Runs a shell command in the repo. Failure is returned, not thrown, because some failures are findings. */
function sh(command) {
  const result = spawnSync(command, { cwd: root, shell: true, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  const stdout = result.stdout ?? "";
  return { ok: result.status === 0, status: result.status, stdout, output: `${stdout}${result.stderr ?? ""}` };
}

/** Returns stdout only, because Git writes warnings about line endings to stderr. */
function must(command) {
  const result = sh(command);
  if (!result.ok) throw new Error(`This command failed: ${command}\n${tail(result.output)}`);
  return result.stdout;
}

// Git state

const currentBranch = () => sh("git branch --show-current").stdout.trim();
const branchExists = () => sh(`git rev-parse --verify --quiet ${branch}`).ok;

function commitsOnBranch() {
  return branchExists() ? must(`git log ${branch} --format=%s`).split(/\r?\n/) : [];
}

const stepSubject = (step) => `redesign: step ${step.id} ${step.title}`;
const isDone = (step, subjects = commitsOnBranch()) => subjects.includes(stepSubject(step));

/** The commit every later step is compared against. */
function setupCommit() {
  const commit = must(`git log ${branch} --format=%H --grep="^${stepSubject(steps[0])}$"`).trim().split(/\r?\n/)[0];
  if (!commit) throw new Error("Can't find the setup commit, so the protected files can't be checked. Run step 01 first.");
  return commit;
}

function ensureOnBranch() {
  if (currentBranch() !== branch) {
    throw new Error(`Switch to the ${branch} branch first: git switch ${branch}`);
  }
}

function commitStep(step) {
  ensureOnBranch();
  must("git add -A");
  must(`git commit --allow-empty -m "${stepSubject(step)}"`);
  console.log(`Committed: ${stepSubject(step)}`);
}

// Dev server

let devServer = null;

async function isServing() {
  try {
    await fetch(`http://localhost:${port}/`, { signal: AbortSignal.timeout(20_000) });
    return true;
  } catch {
    return false;
  }
}

async function startDevServer() {
  if (await isServing()) return;
  mkdirSync(logs, { recursive: true });
  const logPath = join(logs, "dev-server.log");
  const log = createWriteStream(logPath);
  devServer = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "-p", String(port)], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
  });
  devServer.stdout.pipe(log);
  devServer.stderr.pipe(log);
  for (let tries = 0; tries < 60; tries++) {
    if (await isServing()) return;
    await sleep(2_000);
  }
  throw new Error(
    `The dev server didn't start on port ${port}. If you have one running from this folder, stop it first. Log: ${logPath}`,
  );
}

function stopDevServer() {
  if (!devServer) return;
  if (windows) spawnSync(`taskkill /pid ${devServer.pid} /T /F`, { shell: true, stdio: "ignore" });
  else devServer.kill();
  devServer = null;
}

// Claude Code

function findClaude() {
  if (process.env.CLAUDE_PATH) return process.env.CLAUDE_PATH;
  const onPath = sh(windows ? "where claude.exe" : "command -v claude");
  if (onPath.ok) return onPath.stdout.split(/\r?\n/)[0].trim();

  const extensions = join(homedir(), ".vscode", "extensions");
  if (existsSync(extensions)) {
    const newest = readdirSync(extensions)
      .filter((name) => name.startsWith("anthropic.claude-code-"))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .pop();
    const bundled = newest && join(extensions, newest, "resources", "native-binary", windows ? "claude.exe" : "claude");
    if (bundled && existsSync(bundled)) return bundled;
  }
  throw new Error("Can't find Claude Code. Install the CLI, or set CLAUDE_PATH to its full path.");
}

/** Variables that tie a process to the Claude session that launched it. Child sessions must start clean. */
function sessionEnv() {
  const env = { ...process.env, DO_NOT_TRACK: "1" };
  for (const name of [
    "CLAUDECODE",
    "CLAUDE_PID",
    "CLAUDE_EFFORT",
    "CLAUDE_AGENT_SDK_VERSION",
    "CLAUDE_CODE_ENTRYPOINT",
    "CLAUDE_CODE_EXECPATH",
    "CLAUDE_CODE_SSE_PORT",
    "CLAUDE_CODE_SESSION_ID",
    "CLAUDE_CODE_SESSION_ATTENDED",
    "CLAUDE_CODE_CHILD_SESSION",
    "CLAUDE_CODE_MESSAGING_SOCKET",
    "CLAUDE_CODE_MESSAGING_TOKEN",
    "CLAUDE_CODE_ENABLE_TASKS",
    "CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING",
    "CLAUDE_CODE_QUESTION_PREVIEW_FORMAT",
    "CLAUDE_CODE_EMIT_STARTUP_TIMING",
    "CLAUDE_CODE_STARTUP_FAILURE_RESULTS",
  ]) {
    delete env[name];
  }
  return env;
}

// The /impeccable prefix loads the skill every time, instead of relying on the model to reach for it.
const stepPrompt = (step) => `/impeccable Read redesign/preamble.md, then do redesign/steps/${step.id}-${step.title}.md.`;

function modelArgs(options) {
  return options.model ? ["--model", options.model] : [];
}

let spentUsd = 0;

function describeTool({ name, input = {} }) {
  const detail = input.file_path ?? input.command ?? input.pattern ?? input.skill ?? input.description ?? "";
  const line = String(detail).split(/\r?\n/)[0].replaceAll("\\", "/");
  return `  ${name} ${line.replace(`${root.replaceAll("\\", "/")}/`, "").slice(0, 110)}`;
}

/** Runs one session with nobody at the keyboard, showing progress as it goes. */
function runHeadless(prompt, logName, bans, options) {
  const startedAt = Date.now();
  mkdirSync(logs, { recursive: true });
  const log = createWriteStream(join(logs, `${logName}.jsonl`), { flags: "a" });
  const child = spawn(
    findClaude(),
    [
      "-p",
      "--output-format",
      "stream-json",
      "--verbose",
      "--permission-mode",
      "acceptEdits",
      "--allowedTools",
      allowedTools,
      "--disallowedTools",
      bans,
      "--max-budget-usd",
      String(options.budget),
      ...modelArgs(options),
    ],
    { cwd: root, env: sessionEnv(), stdio: ["pipe", "pipe", "pipe"] },
  );
  child.stdin.end(prompt);

  return new Promise((resolve) => {
    let finalMessage = null;
    let stderr = "";
    let stalled = false;
    const stop = () => {
      stalled = true;
      if (windows) spawnSync(`taskkill /pid ${child.pid} /T /F`, { shell: true, stdio: "ignore" });
      else child.kill();
    };
    let timer = setTimeout(stop, quietLimitMs);

    child.stderr.on("data", (chunk) => (stderr += chunk));
    createInterface({ input: child.stdout }).on("line", (line) => {
      clearTimeout(timer);
      timer = setTimeout(stop, quietLimitMs);
      log.write(`${line}\n`);
      let event;
      try {
        event = JSON.parse(line);
      } catch {
        return;
      }
      if (event.type === "assistant") {
        for (const block of event.message?.content ?? []) {
          if (block.type === "tool_use") console.log(describeTool(block));
        }
      } else if (event.type === "result") {
        finalMessage = event;
      }
    });

    child.on("close", () => {
      clearTimeout(timer);
      log.end();
      if (stalled) {
        resolve({ ok: false, why: `Nothing happened for ${quietLimitMs / 60000} minutes, so the session was stopped.` });
        return;
      }
      if (!finalMessage) {
        resolve({ ok: false, why: `The session ended without a result.\n${tail(stderr)}` });
        return;
      }
      spentUsd += finalMessage.total_cost_usd ?? 0;
      if (finalMessage.result) console.log(`\n${finalMessage.result}\n`);
      const minutes = Math.round((Date.now() - startedAt) / 60000);
      console.log(`Session: ${minutes} min, $${(finalMessage.total_cost_usd ?? 0).toFixed(2)}. Run total: $${spentUsd.toFixed(2)}.`);
      for (const denial of finalMessage.permission_denials ?? []) {
        console.log(`  Not allowed: ${denial.tool_name} ${JSON.stringify(denial.tool_input).slice(0, 110)}`);
      }
      resolve({
        ok: !finalMessage.is_error,
        why: finalMessage.subtype === "error_max_budget_usd"
          ? `The session hit its $${options.budget} cap. Rerun to carry on, with --max-budget to raise it.`
          : `The session reported an error: ${finalMessage.subtype}\n${finalMessage.result ?? ""}`,
      });
    });
  });
}

/** Opens a normal Claude Code session in this terminal and waits for the owner to exit it. */
function runInteractive(prompt, options) {
  const child = spawn(
    findClaude(),
    [prompt, "--permission-mode", "acceptEdits", "--allowedTools", allowedTools, ...modelArgs(options)],
    { cwd: root, env: sessionEnv(), stdio: "inherit" },
  );
  return new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("close", resolve);
  });
}

// Checks

function protectedChanges() {
  const paths = protectedPaths.join(" ");
  const base = setupCommit();
  const changed = must(`git diff --name-only ${base} -- ${paths}`);
  const added = must(`git ls-files --others --exclude-standard -- ${paths}`);
  return `${changed}\n${added}`.split(/\r?\n/).filter(Boolean);
}

/** Puts protected files back as they were after setup, and removes any that are new since then. */
function restoreProtected(paths) {
  const base = setupCommit();
  for (const path of paths) {
    if (sh(`git cat-file -e ${base}:${path}`).ok) must(`git checkout ${base} -- ${path}`);
    else rmSync(join(root, path), { force: true });
  }
}

/** Business facts and open questions in site.ts. Copy can change, but a fact can't vanish or be made up. */
function lostFacts() {
  const before = must("git show main:src/content/site.ts");
  const now = readFileSync(join(root, "src", "content", "site.ts"), "utf8");
  const keep = [
    ...(before.match(/\[TODO:[^\]]*\]/g) ?? []),
    ...(before.match(/fromAud: \d+/g) ?? []),
    "Saigon Cut",
    "Tailored in Saigon, Fitted in Melbourne",
    "40%",
    'calUsername: "gia-thinh-nguyen"',
    'slug: "home-visit"',
  ];
  return [...new Set(keep)].filter((fact) => !now.includes(fact));
}

function bannedCopyFound() {
  const found = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (/\.tsx?$/.test(entry.name)) {
        const match = readFileSync(path, "utf8").match(bannedCopy);
        if (match) found.push(`"${match[0]}" in ${path.slice(root.length + 1)}`);
      }
    }
  };
  walk(join(root, "src"));
  return found;
}

/** CalEmbed reads colours from globals.css at runtime. A renamed token would break the calendar silently. */
function missingCalTokens() {
  const embed = readFileSync(join(root, "src", "components", "book", "CalEmbed.tsx"), "utf8");
  const css = readFileSync(join(root, "src", "app", "globals.css"), "utf8");
  return [...embed.matchAll(/token\("([\w-]+)"\)/g)].map((match) => match[1]).filter((name) => !css.includes(`--color-${name}:`));
}

function buildFailures() {
  const failures = [];
  for (const command of ["npm run lint", "npm run build"]) {
    console.log(`Checking: ${command}`);
    const result = sh(command);
    if (!result.ok) failures.push(`${command} failed:\n${tail(result.output)}`);
  }
  return failures;
}

function detectorFindings(logName) {
  const result = sh(`${impeccable} detect --no-advisory ${pageUrls}`);
  mkdirSync(logs, { recursive: true });
  writeFileSync(join(logs, `${logName}-detector.txt`), result.output);
  return result;
}

function runChecks(step) {
  if (step.kind === "direction") {
    const failures = [];
    if (!hasDirection()) failures.push("No direction contract was saved for src/app/page.tsx.");
    const touched = must("git status --porcelain -- src").trim();
    if (touched) failures.push(`This step must not change site code, but it did:\n${touched}`);
    return failures;
  }

  const failures = [];
  const changed = protectedChanges();
  if (changed.length) failures.push(`These files must not change in the redesign: ${changed.join(", ")}`);
  const lost = lostFacts();
  if (lost.length) failures.push(`These facts are gone from src/content/site.ts and must stay: ${lost.join(" | ")}`);
  const banned = bannedCopyFound();
  if (banned.length) failures.push(`Copy that CLAUDE.md bans: ${banned.join(", ")}`);
  const tokens = missingCalTokens();
  if (tokens.length) failures.push(`CalEmbed reads these colours, but globals.css no longer defines them: ${tokens.join(", ")}`);
  failures.push(...buildFailures());

  console.log("Checking: screenshots on desktop and phone");
  const shots = sh(`node redesign/tools/shot.mjs ${pages.join(" ")}`);
  if (!shots.ok) failures.push(`Page checks failed:\n${tail(shots.output)}`);

  console.log("Checking: Impeccable detector on the running site");
  const detector = detectorFindings(`${step.id}-${step.title}`);
  if (detector.status === 2) {
    const summary = tail(detector.output, 40);
    if (step.strictDetector) failures.push(`The Impeccable detector found problems:\n${summary}`);
    else console.log(`  Findings noted, not blocking until step 08. See redesign/logs/${step.id}-${step.title}-detector.txt`);
  } else if (!detector.ok) {
    console.log(`  The detector couldn't scan the site, so it was skipped:\n${tail(detector.output, 5)}`);
  }
  return failures;
}

function hasDirection() {
  if (!existsSync(join(root, ".claude", "skills", "impeccable"))) return false;
  const brief = sh(`${impeccable} surface-brief read src/app/page.tsx`).output;
  return /direction contract/i.test(brief) && /THESIS/.test(brief);
}

// Steps

function assertReadyToBranch() {
  const unexpected = must("git status --porcelain")
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((line) => !/^\?\? (redesign\/|PRODUCT\.md)/.test(line));
  if (unexpected.length) {
    throw new Error(`Commit or stash these changes first, so they don't end up in the redesign:\n${unexpected.join("\n")}`);
  }
  if (currentBranch() !== "main") throw new Error(`Start from main. You're on ${currentBranch()}.`);
}

function updateTextFile(relativePath, change) {
  const path = join(root, relativePath);
  const before = readFileSync(path, "utf8");
  const after = change(before);
  if (after !== before) writeFileSync(path, after);
}

async function setup(step) {
  if (branchExists()) {
    ensureOnBranch();
  } else {
    assertReadyToBranch();
    must(`git switch -c ${branch}`);
    console.log(`Created branch ${branch}. main is untouched.`);
  }

  console.log(`Upgrading Next.js to ${nextVersion}`);
  must(`npm install --save-exact next@${nextVersion} eslint-config-next@${nextVersion} --no-audit --no-fund`);
  if (must("git status --porcelain -- package.json package-lock.json").trim()) {
    must("git add package.json package-lock.json");
    must(`git commit -m "Upgrade Next.js to ${nextVersion} to fix critical security advisories"`);
  }

  if (!existsSync(join(root, ".claude", "skills", "impeccable"))) {
    console.log(`Installing Impeccable ${impeccableVersion} into this project`);
    must(`npx --yes impeccable@${impeccableVersion} install --yes --providers=claude --project`);
  }

  // Anonymous usage data is opt-out. Nobody asked to send it, so it's off for this project.
  mkdirSync(join(root, ".impeccable"), { recursive: true });
  const configPath = join(root, ".impeccable", "config.json");
  const config = existsSync(configPath) ? JSON.parse(readFileSync(configPath, "utf8")) : {};
  writeFileSync(configPath, `${JSON.stringify({ ...config, telemetry: false }, null, 2)}\n`);

  updateTextFile(".gitignore", (text) =>
    text.includes("# impeccable")
      ? text
      : `${text.trimEnd()}\n\n# impeccable: installed tooling and local review files\n/.claude/skills/impeccable/\n/.claude/agents/impeccable-*.md\n/.claude/settings.local.json\n/.impeccable/config.local.json\n/.impeccable/hook.cache.json\n/.impeccable/live/\n/.impeccable/mocks/\n/.impeccable/questions/\n/.impeccable/review/\n/redesign/logs/\n`,
  );
  updateTextFile("eslint.config.mjs", (text) =>
    text.includes('".claude/**"')
      ? text
      : text.replace(/( *)"next-env\.d\.ts",(\r?\n)/, '$1"next-env.d.ts",$2$1// Installed by Impeccable, not our code.$2$1".claude/**",$2'),
  );

  const failures = buildFailures();
  if (failures.length) throw new Error(`The site doesn't build after setup:\n${failures.join("\n")}`);

  console.log("Saving what the old site looks like, for comparison");
  await startDevServer();
  const baseline = "redesign/logs/baseline";
  const shots = sh(`node redesign/tools/shot.mjs --out ${baseline} ${pages.join(" ")}`);
  console.log(tail(shots.output, 9));
  const detector = detectorFindings("baseline");
  console.log(`Detector on the old site: ${tail(detector.output, 1)}`);

  commitStep(step);
}

async function direction(step, options) {
  if (hasDirection()) {
    console.log("A direction is already saved, so there's nothing to choose.");
  } else if (options.unattended) {
    const prompt = `${stepPrompt(step)} The owner started this with --unattended and told you to proceed without them. There's no question tool and no decision page, so take the direction the roll assigns and list your assumptions in redesign/NOTES.md.`;
    const result = await runHeadless(prompt, `${step.id}-${step.title}`, unattendedBans.join(" "), options);
    if (!result.ok) throw new Error(result.why);
  } else {
    console.log("Claude Code will open here so you can choose the direction. Type /exit when it says the direction is saved.\n");
    await runInteractive(stepPrompt(step), options);
  }
  finishStep(step, runChecks(step));
}

function finishStep(step, failures) {
  if (failures.length) {
    throw new Error(
      `Step ${step.id} isn't committed, because these checks failed:\n\n${failures.join("\n\n")}\n\nYour work is still in the folder. Fix it, then run: node redesign/run.mjs --check ${step.id}`,
    );
  }
  commitStep(step);
}

/** One attempt to fix failed checks before stopping. Protected files are put back rather than repaired. */
async function repair(step, failures, options) {
  const changed = protectedChanges();
  restoreProtected(changed);
  const prompt = [
    `/impeccable Read redesign/preamble.md. Step ${step.id} (redesign/steps/${step.id}-${step.title}.md) is finished, but these automatic checks failed:`,
    failures.join("\n\n"),
    changed.length ? `The runner has already restored these protected files, so adapt your work to them: ${changed.join(", ")}` : "",
    "Fix these problems and nothing else.",
  ].join("\n\n");
  const result = await runHeadless(prompt, `${step.id}-${step.title}`, buildBans, options);
  if (!result.ok) throw new Error(result.why);
}

async function session(step, options) {
  const result = await runHeadless(stepPrompt(step), `${step.id}-${step.title}`, buildBans, options);
  if (!result.ok) throw new Error(`${result.why}\nYour work so far is still in the folder. Rerun to carry on.`);

  let failures = runChecks(step);
  if (failures.length) {
    console.log(`\n${failures.length} check(s) failed. Giving Claude one attempt to fix them.\n`);
    await repair(step, failures, options);
    failures = runChecks(step);
  }
  finishStep(step, failures);
}

async function runStep(step, options) {
  console.log(`\n=== Step ${step.id}: ${step.title} ===\n`);
  if (step.kind === "script") {
    await setup(step);
    return;
  }
  ensureOnBranch();
  await startDevServer();
  if (step.kind === "direction") await direction(step, options);
  else await session(step, options);
}

function printStatus() {
  const subjects = commitsOnBranch();
  let nextShown = false;
  for (const step of steps) {
    const done = isDone(step, subjects);
    const label = done ? "done" : nextShown ? "" : "next";
    if (!done) nextShown = true;
    console.log(`${step.id}  ${step.title.padEnd(15)} ${label}`);
  }
}

function stepById(id) {
  const step = steps.find((candidate) => candidate.id === id);
  if (!step) throw new Error(`There's no step ${id}. Run --status to see them.`);
  return step;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.status) {
    printStatus();
    return;
  }
  if (options.check) {
    const step = stepById(options.check);
    ensureOnBranch();
    await startDevServer();
    finishStep(step, runChecks(step));
    return;
  }

  const todo = options.only ? [stepById(options.only)] : steps.filter((step) => !isDone(step));
  if (todo.length === 0) console.log("Every step is done. See redesign/NOTES.md for what's still open.");
  for (const step of todo) await runStep(step, options);
  if (!options.only && steps.every((step) => isDone(step))) {
    console.log(`\nAll done, on the ${branch} branch. Nothing was pushed. Read redesign/NOTES.md next.`);
  }
}

process.on("SIGINT", () => {
  stopDevServer();
  process.exit(130);
});

main()
  .catch((error) => {
    console.error(`\nStopped: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(stopDevServer);
