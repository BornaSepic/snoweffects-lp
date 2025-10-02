#!/bin/bash

set -Eeuo pipefail

./bin/compile-ts.sh

node -r esm ./lib/core/dato/sdk/print.js "${@}"
