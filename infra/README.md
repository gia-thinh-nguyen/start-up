# Hosting with Terraform

Terraform sets up the Amplify app once. After that, every push to `main` or `development` builds and deploys by
itself, using `amplify.yml`. Run `terraform apply` again only when this setup changes.

| File | What it sets up |
|---|---|
| `bootstrap/` | The private S3 bucket that holds Terraform's state. Run once. |
| `amplify.tf` | The app and its two branches: `main` (live) and `development` (testing). |
| `iam.tf` | The site's role (may read `/saigon-tailors/*` in Parameter Store, nothing else) and Amplify's role (writes logs). |
| `domain.tf` | `saigontailors.com.au` and `www.` on `main`. Off until `connect_domain = true`. |
| `imports.tf` | Takes over the app you connect in the console. |

No secrets go in Terraform. They're created by hand in Parameter Store, as listed in `.env.example`.
Commands below are for PowerShell, run from the project folder.

## 1. Tools and sign-in

```powershell
winget install Hashicorp.Terraform
winget install Amazon.AWSCLI
```

Open a new terminal, then sign in with your IAM Identity Center user (not the root user):

```powershell
aws configure sso          # profile name: saigon-tailors, region: ap-southeast-2
$env:AWS_PROFILE = "saigon-tailors"
aws sts get-caller-identity   # shows your account, so you know it worked
```

Set `$env:AWS_PROFILE` again in each new terminal, and run `aws sso login` when the sign-in expires.

## 2. The development branch

`amplify.yml` and this folder must be on `main` first. Then:

```powershell
git switch main
git pull
git switch -c development
git push -u origin development
```

## 3. The state bucket (once)

```powershell
cd infra/bootstrap
terraform init
terraform apply
```

Type `yes`. Copy the `state_bucket` output into `infra/backend.hcl`. Keep `infra/bootstrap/terraform.tfstate`
somewhere safe (it isn't committed); you only need it if you ever change the bucket.

## 4. Connect GitHub in the Amplify console

AWS console, Sydney region → Amplify → **Create new app** → GitHub → sign in to GitHub and allow access to the
`start-up` repo only.

- Branch: `development`
- App name: `saigon-tailors`
- Build settings: Amplify finds `amplify.yml`. Leave them as they are.
- Service role: let the console create one. Terraform swaps in its own in the next step.
- Leave environment variables empty.

Save and deploy. The first build may work while forms and booking fail: the site can't read its secrets until
Terraform adds its role. Copy the **App ID** (App settings → General, it starts with `d`) into
`infra/terraform.tfvars`.

## 5. Let Terraform take over

```powershell
cd infra
terraform init -backend-config=backend.hcl
terraform plan
```

Read the plan before applying. It should **import** the app and the `development` branch, **create** the `main`
branch and two IAM roles, and **update** the app in place. If any line says `destroy` or `must be replaced`,
stop and ask: it would delete the app.

```powershell
terraform apply
```

Commit `infra/.terraform.lock.hcl`: it pins the exact provider version.

## 6. Test on development

In the Amplify console, open `development` and redeploy it so it starts with the new role. Then:

1. Add the `development_url` output's hostname to the Turnstile widget in Cloudflare.
2. Set up the Stripe sandbox webhook to `<development_url>/api/stripe-webhook` (see `docs/tech-stack.md`).
3. On your phone: send a contact enquiry, make a booking with a travel fee, pay with `4242 4242 4242 4242`.

To see server errors: Amplify console → the branch → Monitoring → Hosting compute logs.

## 7. The live domain (when development works)

Set `connect_domain = true` in `terraform.tfvars`, then `terraform apply` and `terraform output dns_records`.
Add those records at the domain's DNS host within a day or so, or Amplify stops waiting and you apply again.

A bare domain (`saigontailors.com.au`, no `www`) can't use a normal CNAME record. The DNS host needs an ALIAS,
ANAME or "CNAME flattening" record, or the bare domain has to forward to `www`. Check what your DNS host offers
before connecting the domain.

The Cal.com "Booking created" webhook and the live Stripe webhook point at the live domain, so set them up after
it works.
