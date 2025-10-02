#!/usr/bin/env bash

set -Eeuo pipefail

echoerr() { printf "%s\n" "$*" >&2; }

SCRIPT_DIR=$(realpath "$(dirname "${BASH_SOURCE[0]}")")

found_utils=$(fdfind --type=directory --ignore-case -1 'util' src/core)

if [ -n "$found_utils" ]; then
  echoerr "ERROR: 'utils' folder name is not allowed in core: ${found_utils}"
  exit 1
fi

biome lint --only=style/useFilenamingConvention --diagnostic-level=error

fdfind . /app/src \
  --type=directory --batch-size 25 \
  --exec-batch node ./devops/lib/lint-folder-names/index.js {}

fdfind . /app/src \
  --type=file --batch-size 25 \
  -e ts -e tsx -e js -e mjs -e cjs \
  --exec-batch node ./devops/lib/lint-filenames/index.js {}

echoerr "Filesystem linting complete"
