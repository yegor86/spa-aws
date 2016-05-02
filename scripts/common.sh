#!/usr/bin/env bash
profile=spa

function check_python() {
  if ! which python > /dev/null; then
    echo "Can't find Python. You need Python 2.7 or later to use this."
    exit 1
  fi
}

function check_aws() {
  if ! which aws > /dev/null; then
    echo "Can't find AWS CLI. Install 'awscli' using pip."
    exit 1
  fi
  if ! aws configure list --profile $profile > /dev/null; then
    echo "Run \`aws configure --profile $profile\` to create it"
    exit 1
  fi
}

action=${1:-"help"}

check_python
check_aws