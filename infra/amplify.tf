# The app is created in the Amplify console with GitHub's own sign-in, then imported here (imports.tf).
# Terraform creating it would need a GitHub token, and that token would end up in Terraform's state.

locals {
  # Only these two branches deploy. Each branch's settings come from amplify.yml, worked out from its name.
  branches = {
    main        = "PRODUCTION"
    development = "DEVELOPMENT"
  }
}

resource "aws_amplify_app" "site" {
  name       = "saigon-tailors"
  repository = var.repository
  # Next.js with server rendering (API routes, the booking confirmation page).
  platform = "WEB_COMPUTE"

  # Built from the role's name so it's known at plan time. The provider treats an unknown service role as removed,
  # and since a service role can't be removed it plans to replace (delete) the app.
  iam_service_role_arn = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/${aws_iam_role.amplify_service.name}"
  compute_role_arn     = aws_iam_role.amplify_compute.arn

  enable_branch_auto_build = true
  # No deploys for other branches or pull requests: they'd have no secrets, so forms and booking would fail.
  enable_auto_branch_creation = false
  enable_branch_auto_deletion = false

  lifecycle {
    # The GitHub connection belongs to the console. The build settings come from amplify.yml in the repo.
    ignore_changes = [access_token, oauth_token, build_spec]
  }
}

resource "aws_amplify_branch" "site" {
  for_each = local.branches

  app_id      = aws_amplify_app.site.id
  branch_name = each.key
  stage       = each.value
  framework   = "Next.js - SSR"

  enable_auto_build           = true
  enable_pull_request_preview = false
}
