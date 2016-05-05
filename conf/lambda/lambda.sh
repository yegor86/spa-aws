#!/usr/bin/env bash
set -x

TARGET_DIR=target
SOURCE_DIR=.

function build_bundle() {
  check_node_deps
  
  local funcName=${1}
  pushd ${funcName}
  rm archive.zip
  npm install --no-bin-links || exit 1
  mkdir -p dist
  cp -r node_modules dist/
  cp -r lib/* dist/
  cd dist
  zip -r archive.zip *
  mv archive.zip ..
  cd ..
  rm -rf dist
  popd
}

action=${1:-"help"}

case "$action" in

  build_bundle)
    if [[ $# -eq 3 ]]; then
      pushd ${3}
      source ../common.sh
      mkdir $TARGET_DIR
      build_bundle ${2}
      popd
    else
      echo "Please specify " 
      echo "Usage: lambda.sh id_pool /home/user/spa-aws/config/cognito"
      exit 1
    fi
    ;;

  *)
    help
    ;;
esac


