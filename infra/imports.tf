# Takes over the app and the branch connected in the Amplify console. Once they're in Terraform's state these do
# nothing, but they're kept so a fresh state can take them over again the same way.

import {
  to = aws_amplify_app.site
  id = var.amplify_app_id
}

import {
  to = aws_amplify_branch.site["development"]
  id = "${var.amplify_app_id}/development"
}
