#!/bin/bash

set -Eeuo pipefail

echo 'Generating GraphQL SDKs'

graphql-codegen --config ./graphql.config.js --project dato_sdk
