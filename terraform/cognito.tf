variable "identity_pool_name" {
    default = "id-pool1"
}

variable "temp_dir" {
    default = "./temp"
}

resource "null_resource" "create_pool" {
    provisioner "local-exec" {
        command = <<EOM
#!/bin/bash
echo "Creating identity pool: $identity_pool_name"
aws cognito-identity create-identity-pool \
      --identity-pool-name ${var.identity_pool_name} \
      --cli-input-json "config.json" \
      > pool_info.json
EOM
    }
}

resource "null_resource" "create_cognito_role" {
    depends_on = ["null_resource.create_pool"]
 
    provisioner "local-exec" {
        command = <<EOM
#!/bin/bash
local pool_id=$(../support/jsed.py pool_info.json 'IdentityPoolId')
local pool_name=$(../support/jsed.py pool_info.json 'IdentityPoolName')
cat <<EOF > assume_role_policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "${pool_id}"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }
    }
  ]
}
EOF
echo "Creating IAM role for identity pool: $identity_pool_name"

local role_name="${pool_name}_cognito_authenticated"
aws iam create-role \
    --role-name "$role_name" \
    --assume-role-policy-document "assume_role_policy.json" \
    > ${identity_pool_dir}/role_info.json
EOM
    }
}

resource "null_resource" "update_role" {
    depends_on = ["null_resource.create_cognito_role"]
    provisioner "local-exec" {
        command = <<EOM
#!/bin/bash
local pool_id=$(support/jsed.py pool_info.json 'IdentityPoolId')
local role_arn=$(support/jsed.py role_info.json 'Role.Arn')
echo "Updating identity pool roles"
aws cognito-identity set-identity-pool-roles \
    --identity-pool-id ${pool_id} \
    --roles authenticated=${role_arn}
EOM
    }
}

