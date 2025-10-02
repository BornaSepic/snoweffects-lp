#!/bin/bash

set -Eeuo pipefail

echoerr() { printf "%s\n" "$*" >&2; }

echoerr 'Compiling Typescript files with swc'

swc --quiet --copy-files --include-dotfiles \
  --config-file ./main.swcrc \
  --out-dir lib src

echoerr 'Typescript files compiled'
