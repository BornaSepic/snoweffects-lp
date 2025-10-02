#!/bin/bash

set -Eeuo pipefail

fdfind -t file --print0 -e module.scss . ./src \
  | parallel --halt='soon,fail=20%' -0 --xargs --max-args=5 --jobs='100%' \
      'node devops/lib/codegen-style-typedef.js {}'
