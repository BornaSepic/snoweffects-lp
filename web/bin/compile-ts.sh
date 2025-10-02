#!/bin/bash

set -Eeuo pipefail

echoerr() { printf "%s\n" "$*" >&2; }

project_root=$(dirname $(dirname $(realpath $0)))

echoerr 'Compiling Typescript files with swc'

swc --quiet --copy-files --include-dotfiles \
  --config-file ./main.swcrc \
  --strip-leading-paths \
  --out-dir lib src

# The swc cli doesn't parse nested paths correctly,
# e.g., `swc --out-dir devops/lib devops/src`
# produces nested src folder in the lib folder.
# To work around the issue, we change the working directory of the script
# and use simple folder names

cd "${project_root}/datocms"

swc --quiet --copy-files --include-dotfiles \
  --config-file ./datocms.swcrc \
  --delete-dir-on-start \
  --strip-leading-paths \
  --out-dir lib src

cd "${project_root}"

./bin/predevops.sh

echoerr 'Typescript files compiled'
