#!/bin/bash

set -Eeuo pipefail

script -qec "next dev -p $PORT --hostname '0.0.0.0'"
