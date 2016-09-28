#!/usr/bin/env bash
TARGET_DIR=target
SOURCE_DIR=.

function create_cognito_auth_role() {
  local pool_id=${1}
  local pool_name=${2}
    
  generate_assume_role_policy ${pool_id} > $SOURCE_DIR/assume_role_policy.json
  
  local role_name="${pool_name}_cognito_role"
  echo "Creaing role: $role_name"
  
  aws --profile $profile iam create-role \
    --role-name "$role_name" \
    --assume-role-policy-document "file://$SOURCE_DIR/assume_role_policy.json" \
    > $TARGET_DIR/role_info.json
}

function generate_assume_role_policy() {
  local identity_pool_arn=$1
cat <<DOC
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
          "cognito-identity.amazonaws.com:aud": "${identity_pool_arn}"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }
    }
  ]
}
DOC
}

function create_identity_pool() {
  
  if [[ ! -e $SOURCE_DIR/config.json ]]; then
    echo "Can't find pool config file $SOURCE_DIR/config.json"
    exit 1
  fi

  local identity_pool_name=${1}

  echo "Creating identity pool: $identity_pool_name"
  aws --profile $profile cognito-identity create-identity-pool \
    --identity-pool-name $identity_pool_name \
    --cli-input-json "file://$SOURCE_DIR/config.json" \
    > $TARGET_DIR/pool_info.json
  
  local pool_id=$($SOURCE_DIR/jsed.py $TARGET_DIR/pool_info.json 'IdentityPoolId')
  echo "Pool id: ${pool_id}, Pool name: ${identity_pool_name}" 
  
  create_cognito_auth_role ${pool_id} ${identity_pool_name}
}

function update_identity_pool_role() {
  local pool_id=$($SOURCE_DIR/jsed.py $TARGET_DIR/pool_info.json 'IdentityPoolId')
  local role_arn=${1}

  echo "Updating identity pool ${pool_id} roles: ${role_arn}"
  aws --profile $profile cognito-identity set-identity-pool-roles \
    --identity-pool-id ${pool_id} \
    --roles authenticated=${role_arn}
}

action=${1:-"help"}

case "$action" in

  create_pool)
    if [[ $# -eq 3 ]]; then
      pushd ${3}
      source ../common.sh
      mkdir $TARGET_DIR
      create_identity_pool ${2}
      popd
    else
      echo "Please specify a Cognito identity pool name and source directory" 
      echo "Usage: cognito id_pool /home/user/spa-aws/config/cognito"
      exit 1
    fi
    ;;

  update_role)
    if [[ $# -eq 3 ]]; then
      pushd ${3}
      source ../common.sh
      mkdir $TARGET_DIR
      update_identity_pool_role ${2}
      popd
    else
      echo "Please specify a Cognito identity pool id and role arn" 
      echo "Usage: cognito id_pool /home/user/spa-aws/config/cognito"
      exit 1
    fi
    ;;

  *)
    help
    ;;
esac


