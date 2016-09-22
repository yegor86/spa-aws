resource "aws_s3_bucket" "demos3" {
    bucket = "spa.demos.com"
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