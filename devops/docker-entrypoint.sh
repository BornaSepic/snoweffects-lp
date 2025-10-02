#!/bin/bash

set -Eeuo pipefail

./bin/symlink-node-modules.sh

pnpm install

exec "$@"
