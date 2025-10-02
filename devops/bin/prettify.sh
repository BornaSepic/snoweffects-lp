#!/bin/bash

set -Eeuo pipefail

echo 'Prettifying files'

root=${1:-$(pwd)}

rg --files --ignore-file ./.gitignore --type-add='graphql:*.{gql,graphql}' -t graphql -t js -t sass -t ts "${root}" \
  | sort -V \
  | parallel --halt='soon,fail=20%' --line-buffer --xargs 'prettier --write {}'
