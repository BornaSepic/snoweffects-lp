#!/bin/bash

set -Eeuo pipefail

echo 'Watching lintable files'
watchexec --exts js,jsx,ts,tsx --postpone --watch ./src -i '**/node_modules/**' -i '**/tmp/**' './bin/lint.sh'
