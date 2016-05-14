resource "aws_dynamodb_table" "problems" {
    name = "problems"
    read_capacity = 5
    write_capacity = 5
    hash_key = "problemId"    
    attribute {
      name = "problemId"
      type = "N"
    }      
}

resource "aws_iam_role_policy" "dynamodb_access_policy" {
    depends_on = ["aws_iam_role.cognito_role"]
    name = "dynamodb_access_policy"
    role = "${aws_iam_role.cognito_role.id}"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [{ 
      "Effect": "Allow",
      "Action": [
        "dynamodb:BatchGetItem",
        "dynamodb:BatchWriteItem",
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:Query",
        "dynamodb:UpdateItem"
      ],
      "Resource": ["${aws_dynamodb_table.problems.arn}"],
      "Condition": {
        "ForAllValues:StringEquals": {
          "dynamodb:LeadingKeys": ["$${cognito-identity.amazonaws.com:sub}"]
        }
      }
  }]
}
EOF
}

resource "aws_dynamodb_table" "answers" {
    name = "answers"
    read_capacity = 5
    write_capacity = 5
    hash_key = "problemId"    
    range_key = "userId"
    attribute {
      name = "problemId"
      type = "N"
    }      
    attribute {
      name = "userId"
      type = "S"
    }
}

resource "aws_iam_role_policy" "tbl_answers_access_policy" {
    depends_on = ["aws_iam_role.cognito_role"]
    name = "tbl_answers_access_policy"
    role = "${aws_iam_role.cognito_role.id}"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [{ 
      "Effect": "Allow",
      "Action": [
        "dynamodb:BatchGetItem",
        "dynamodb:BatchWriteItem",
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:Query",
        "dynamodb:UpdateItem"
      ],
      "Resource": ["${aws_dynamodb_table.answers.arn}"],
      "Condition": {
        "ForAllValues:StringEquals": {
          "dynamodb:LeadingKeys": ["$${cognito-identity.amazonaws.com:sub}"]
        }
      }
  }]
}
EOF
}