# Run once, before anything in infra/: creates the private bucket that holds Terraform's state for the website.
# This folder keeps its own state on your computer (terraform.tfstate here, never committed). The bucket refuses
# to be destroyed, so the website's state can't be lost by accident.

terraform {
  required_version = ">= 1.11"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-2"

  default_tags {
    tags = {
      Project   = "saigon-tailors"
      ManagedBy = "terraform"
    }
  }
}

data "aws_caller_identity" "current" {}

resource "aws_s3_bucket" "state" {
  # Bucket names are global across AWS, so the account ID keeps this one unique.
  bucket = "saigon-tailors-terraform-state-${data.aws_caller_identity.current.account_id}"

  lifecycle {
    prevent_destroy = true
  }
}

# Every change to the state is kept, so a bad apply can be rolled back.
resource "aws_s3_bucket_versioning" "state" {
  bucket = aws_s3_bucket.state.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "state" {
  bucket = aws_s3_bucket.state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "state" {
  bucket = aws_s3_bucket.state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

output "state_bucket" {
  description = "Put this name in infra/backend.hcl."
  value       = aws_s3_bucket.state.bucket
}
