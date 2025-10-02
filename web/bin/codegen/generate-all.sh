#!/bin/bash

set -Eeuo pipefail

codegen_prettify() {
  ./bin/prettify.sh ./src/core/dato
}

codegen_prettify

echo "Fetching GraphQL schemas"
./bin/codegen/fetch-graphql-schemas.sh

echo "Generating GraphQL SDKs"
./bin/codegen/generate-sdk.sh

echo "Generating type definitions for CSS modules"
bb codegen-typed-css-modules

codegen_prettify

echo "All codegen tasks completed"
