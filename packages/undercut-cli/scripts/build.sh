#!/usr/bin/env bash

set -e

CWD="$( pwd )"
PATH="$CWD/node_modules/.bin:$PATH"
BUILD="$CWD/build"

rm -rf $BUILD
mkdir $BUILD

cp -v LICENSE README.md $BUILD
node ./scripts/fix_package_json.js package.json $BUILD/package.json

babel ./src \
	--extensions ".js,.cjs,.mjs,.ts" \
	--ignore "**/*.test.js","**/*.test.int.js" \
	--out-dir $BUILD/lib \
	--root-mode upward \
	--source-maps
