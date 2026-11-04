# The website's hosting: an Amplify app that builds and deploys every push to main and development.
# Setup steps are in infra/README.md.
#
# No secrets are set here. They're created by hand in Parameter Store, so they never sit in Terraform's state.

terraform {
  required_version = ">= 1.11"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # The bucket name is in backend.hcl: terraform init -backend-config=backend.hcl
  backend "s3" {
    key          = "website/terraform.tfstate"
    region       = "ap-southeast-2"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Project   = "saigon-tailors"
      ManagedBy = "terraform"
    }
  }
}

data "aws_caller_identity" "current" {}
