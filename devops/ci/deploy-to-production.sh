#!/bin/bash

set -Eeuo pipefail

./bin/compile-ts.sh

node ./lib/deploy-to-production/index.js
