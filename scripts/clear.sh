#!/usr/bin/env bash

set -e

rm -rf coverage
rm -rf node_modules
rm -rf packages/*/build
rm -rf packages/*/coverage
rm -rf packages/*/dist
rm -rf packages/*/node_modules
rm -f packages/*/*.tgz
rm -f *.tgz
