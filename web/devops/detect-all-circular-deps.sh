#!/usr/bin/env bash

set -Eeuo pipefail

fdfind -e ts -e tsx . ./src/app ./src/pages \
  | parallel --jobs='100%' --halt='soon,fail=10%' --line-buffer \
    './devops/detect-circular-deps.sh {}'
