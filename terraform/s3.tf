resource "aws_s3_bucket" "demo" {
    bucket = "spa.demo.io"
    acl = "public-read"
    //policy = "${file("policy.json")}"

    website {
        index_document = "index.html"
        routing_rules = <<EOF
[{
    "Condition": {
        "KeyPrefixEquals": "docs/"
    },
    "Redirect": {
        "ReplaceKeyPrefixWith": "documents/"
    }
}]
EOF
    }
}

/*
resource "aws_iam_role_policy" "s3_access_policy" {
    name = "s3_access_policy"
    role = "${aws_iam_role.cognito_role.id}"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {


      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["${aws_s3_bucket.demo.arn}"],
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": ["${aws_s3_bucket.demo.arn}"]
    }
  ]
}
EOF
}
*/