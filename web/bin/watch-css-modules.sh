#!/bin/bash

set -Eeuo pipefail

echo 'Watching CSS Modules'
script -qec \
  "watchexec --exts scss --postpone --watch ./src -i '**/node_modules/**' -i '**/tmp/**' 'bb codegen-typed-css-modules'"
