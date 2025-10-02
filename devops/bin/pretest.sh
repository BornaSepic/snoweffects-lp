#!/bin/bash

set -Eeuo pipefail

echo 'Compiling Typescript files with swc'

swc --quiet --copy-files --include-dotfiles \
  --config-file ./main.swcrc \
  --delete-dir-on-start \
  --out-dir lib-test src
