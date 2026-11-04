output "development_url" {
  description = "Add this hostname to the Turnstile widget in Cloudflare, and use it for the Stripe sandbox webhook."
  value       = "https://development.${aws_amplify_app.site.default_domain}"
}

output "dns_records" {
  description = "Add these at the domain's DNS host once connect_domain is true."
  value = var.connect_domain ? {
    certificate = aws_amplify_domain_association.site[0].certificate_verification_dns_record
    sub_domains = [for sub in aws_amplify_domain_association.site[0].sub_domain : sub.dns_record]
  } : null
}
