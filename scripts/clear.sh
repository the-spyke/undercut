#!/usr/bin/env bash

set -e

rm -rf node_modules
rm -rf packages/*/build
rm -rf packages/*/coverage
rm -rf packages/*/dist
rm -rf packages/*/node_modules
rm -rf packages/*/*.tgz
rm -f *.tgz
