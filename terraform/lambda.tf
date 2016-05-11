resource "aws_iam_role" "iam_role_for_lambda" {
    name = "iam_role_for_lambda"
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

resource "aws_iam_role_policy" "iam_policy_for_lambda" {
    depends_on = ["aws_iam_role.iam_role_for_lambda"]
    name = "iam_policy_for_lambda"
    role = "${aws_iam_role.iam_role_for_lambda.id}"
    policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1428341300017",
            "Action": [
                "dynamodb:DeleteItem",
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:UpdateItem"
            ],
            "Effect": "Allow",
            "Resource": "${aws_dynamodb_table.problems.arn}"
        },
        {
            "Sid": "",
            "Resource": "*",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Effect": "Allow"
        }
    ]
}
EOF
}

resource "template_file" "generated_project_config" {
    depends_on = ["aws_iam_role.iam_role_for_lambda"]
    template = "${file("${path.module}/../services/project.json.tpl")}"
    vars {
        iam_role = "${aws_iam_role.iam_role_for_lambda.arn}"
        aws_region = "${var.aws_region}"
    }
    provisioner "local-exec" {
        command ="echo \"${self.rendered}\" > ${path.module}/../services/project.json"
    }
}