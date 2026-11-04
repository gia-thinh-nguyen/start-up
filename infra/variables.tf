variable "region" {
  description = "Where the site and its Parameter Store secrets live. Must match parameterStore.region in src/config.ts."
  type        = string
  default     = "ap-southeast-2"
}

variable "repository" {
  description = "The GitHub repo Amplify builds from."
  type        = string
  default     = "https://github.com/gia-thinh-nguyen/start-up"
}

variable "amplify_app_id" {
  description = "The ID of the app created in the Amplify console (e.g. d1abc2def3ghi4), so Terraform can take it over."
  type        = string
}

variable "domain" {
  description = "The live site's domain. It points at the main branch."
  type        = string
  default     = "saigontailors.com.au"
}

variable "connect_domain" {
  description = "Turn on once development has been tested: connects the domain to main and outputs the DNS records."
  type        = bool
  default     = false
}
