resource "null_resource" "build_bundle" {
    provisioner "local-exec" {
        command = "${path.module}/../conf/lambda/lambda.sh build_bundle ${var.lambda_name} ${path.module}/../services"
    }
}

resource "aws_iam_role" "iam_for_lambda" {
    name = "iam_for_lambda"
    assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_function" "check_answer_lambda" {
    filename = "${path.module}/../services/${var.lambda_name}/archive.zip"
    function_name = "${var.lambda_name}"
    role = "${aws_iam_role.iam_for_lambda.arn}"
    handler = "index.${var.lambda_name}"
    source_code_hash = "${path.module}/../services/${var.lambda_name}/archive.zip"
    runtime = "nodejs4.3"
}
