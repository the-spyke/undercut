#!/usr/bin/env bash

set -e

CWD="$( pwd )"
PATH="$CWD/node_modules/.bin:$PATH"
BUILD="$CWD/build"

rm -rf $BUILD
mkdir $BUILD

cp -v LICENSE README.md $BUILD
node scripts/fix_package_json.cjs package.json $BUILD/package.json

babel src/cli.js src/index.js src/polyfills.js --out-dir $BUILD/lib --source-maps
