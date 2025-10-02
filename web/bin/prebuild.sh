#!/bin/bash

set -Eeuo pipefail

if [[ ! -d "public/assets/js" ]]; then
  mkdir public/assets/js
  echo "Created directory: public/assets/js"
else
  echo "Directory public/assets/js already exists"
fi

cp -fv node_modules/hls.js/dist/hls.worker.js public/assets/js/

echo 'Prebuild complete'
