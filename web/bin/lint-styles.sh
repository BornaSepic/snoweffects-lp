#!/bin/bash

set -Eeuo pipefail

echo 'Checking SCSS files'

root=${1:-$(pwd)}

rg --files --ignore-file ./.gitignore -t sass "${root}" \
  | rg -v 'module' \
  | sort -V \
  | parallel --halt='soon,fail=20%' --line-buffer 'sass --load-path "$(pwd)/src/core/styles" --color {} 1>/dev/null'

echo 'Check complete'
