#!/bin/bash

set -Eeuo pipefail

echo 'Fetching remote schemas'

graphql-codegen --config ./graphql.config.js --project dato_schema
