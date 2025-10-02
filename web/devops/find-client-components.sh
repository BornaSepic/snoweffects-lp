#!/usr/bin/env bash

set -Eeuo pipefail

fdfind -t file -e ts -e tsx -e js --exec-batch rg -l --smart-case 'use client' | sort -V
