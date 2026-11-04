import "server-only";
import { GetParametersCommand, SSMClient } from "@aws-sdk/client-ssm";
import { config } from "@/config";

/**
 * The site's secrets: keys and passwords that must never sit in the repo, the build output or Terraform's state.
 *
 * On AWS they live in Parameter Store as SecureStrings, and the site reads them with the Amplify SSR Compute role.
 * Most are the same on every branch and sit once under /saigon-tailors, e.g. /saigon-tailors/SMTP_PASS. Stripe's
 * differ (live keys on main, test keys elsewhere, and a webhook secret per URL), so they sit under the branch's
 * SECRETS_PATH, e.g. /saigon-tailors/main/STRIPE_SECRET_KEY.
 * Without SECRETS_PATH (local development) they all come from .env.local instead.
 *
 * They're read once per running copy of the site, so after changing one, redeploy to pick it up.
 */

const { region, sharedPath } = config.parameterStore;

const secretFolders = {
  SMTP_PASS: "shared",
  TURNSTILE_SECRET_KEY: "shared",
  CAL_API_KEY: "shared",
  CAL_WEBHOOK_SECRET: "shared",
  STRIPE_SECRET_KEY: "branch",
  STRIPE_WEBHOOK_SECRET: "branch",
} as const;

type SecretName = keyof typeof secretFolders;
type Secrets = Partial<Record<SecretName, string>>;

const secretNames = Object.keys(secretFolders) as SecretName[];

let loading: Promise<Secrets> | undefined;

function parameterName(branchPath: string, name: SecretName) {
  return `${secretFolders[name] === "shared" ? sharedPath : branchPath}/${name}`;
}

async function loadFromParameterStore(branchPath: string): Promise<Secrets> {
  const client = new SSMClient({ region });
  const { Parameters = [] } = await client.send(
    new GetParametersCommand({
      Names: secretNames.map((name) => parameterName(branchPath, name)),
      WithDecryption: true,
    }),
  );
  const values = new Map(Parameters.map((parameter) => [parameter.Name, parameter.Value]));
  return Object.fromEntries(secretNames.map((name) => [name, values.get(parameterName(branchPath, name))]));
}

/** The secret's value, or undefined if it isn't set. Never log what this returns. */
export async function getSecret(name: SecretName) {
  const branchPath = process.env.SECRETS_PATH?.replace(/\/+$/, "");
  if (!branchPath) return process.env[name] || undefined;

  // A failed read isn't kept, so the next request tries again.
  loading ??= loadFromParameterStore(branchPath).catch((error: unknown) => {
    loading = undefined;
    throw error;
  });
  return (await loading)[name] || undefined;
}
