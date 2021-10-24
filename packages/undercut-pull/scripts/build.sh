#!/usr/bin/env bash

set -e

CWD="$( pwd )"
PATH="$CWD/node_modules/.bin:$PATH"
BUILD="$CWD/build"

rm -rf $BUILD
mkdir $BUILD

cp -v LICENSE README.md $BUILD
node scripts/fix_package_json.js package.json $BUILD/package.json

export NODE_BUILD_TARGET="rms"

echo "----> Building package for '${NODE_BUILD_TARGET}'"
yarn build:babel --out-dir $BUILD/src --source-maps
yarn build:types --outDir $BUILD/src
