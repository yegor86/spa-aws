resource "aws_s3_bucket" "demos3" {
    bucket = "s3-spa.demos3.com"
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