# The live domain, on main. Off until connect_domain is true: Amplify waits only a limited time for the DNS records,
# so connect it when you're ready to add them at the DNS host.

resource "aws_amplify_domain_association" "site" {
  count = var.connect_domain ? 1 : 0

  app_id                = aws_amplify_app.site.id
  domain_name           = var.domain
  wait_for_verification = false

  sub_domain {
    branch_name = aws_amplify_branch.site["main"].branch_name
    prefix      = ""
  }

  sub_domain {
    branch_name = aws_amplify_branch.site["main"].branch_name
    prefix      = "www"
  }
}
