#!/usr/bin/env bash

set -Eeuo pipefail

file=$1

node ./devops/lib/detect-circular-dependencies.js "${file}"
