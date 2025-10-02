#!/bin/bash

set -Eeuo pipefail

git_status=$(git status -u --porcelain | grep -c '^'; exit 0)
commit_message=${1:-'Auto-save changes'}

if [ $git_status -gt 0 ]; then
  echo 'Uncommitted changes found:'
  git status -u --porcelain \
    && git add -vA \
    && git commit -m "${commit_message}" \
    && git push
else
  echo 'Nothing to commit'
fi
