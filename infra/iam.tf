data "aws_iam_policy_document" "amplify_trust" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["amplify.amazonaws.com"]
    }
  }
}

# The running site: may read its own secrets and nothing else (src/lib/secrets.ts).

resource "aws_iam_role" "amplify_compute" {
  name               = "saigon-tailors-amplify-compute"
  assume_role_policy = data.aws_iam_policy_document.amplify_trust.json
}

# The key AWS uses for SecureStrings by default. It exists once the first SecureString is created in the region.
data "aws_kms_alias" "ssm" {
  name = "alias/aws/ssm"
}

data "aws_iam_policy_document" "read_secrets" {
  statement {
    actions   = ["ssm:GetParameters"]
    resources = ["arn:aws:ssm:${var.region}:${data.aws_caller_identity.current.account_id}:parameter/saigon-tailors/*"]
  }

  statement {
    actions   = ["kms:Decrypt"]
    resources = [data.aws_kms_alias.ssm.target_key_arn]

    # Only to decrypt a parameter read through Parameter Store.
    condition {
      test     = "StringEquals"
      variable = "kms:ViaService"
      values   = ["ssm.${var.region}.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy" "read_secrets" {
  name   = "read-secrets"
  role   = aws_iam_role.amplify_compute.id
  policy = data.aws_iam_policy_document.read_secrets.json
}

# Amplify itself: writes the site's server logs to CloudWatch, so errors can be looked at.

resource "aws_iam_role" "amplify_service" {
  name               = "saigon-tailors-amplify-service"
  assume_role_policy = data.aws_iam_policy_document.amplify_trust.json
}

data "aws_iam_policy_document" "write_logs" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "logs:DescribeLogGroups",
    ]
    resources = ["arn:aws:logs:${var.region}:${data.aws_caller_identity.current.account_id}:log-group:/aws/amplify/*"]
  }
}

resource "aws_iam_role_policy" "write_logs" {
  name   = "write-logs"
  role   = aws_iam_role.amplify_service.id
  policy = data.aws_iam_policy_document.write_logs.json
}
