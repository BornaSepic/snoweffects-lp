#!/bin/bash

set -Eeuxo pipefail

container_name=$1
dest_folder=$2

if [ ! -d "${dest_folder}" ]; then
  echo "Error: ${dest_folder} is not a directory."
  exit 1
fi

container_id=$(docker compose ps -q "${container_name}")

# We copy all files from /app folder in the container into the destination folder
# We use tar stream instead of `docker container cp` to gracefully handle nested node_modules
docker exec ${container_id} tar -cf - --directory=/app . | tar -xf - --directory="${dest_folder}"

chown $(id -u):$(id -g) "${dest_folder}/"
