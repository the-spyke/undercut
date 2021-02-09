#!/usr/bin/env bash

set -e

CWD="$( pwd )"
PATH="$CWD/node_modules/.bin:$PATH"
BUILD="$CWD/build"

rm -rf $BUILD
mkdir $BUILD

cp -v LICENSE README.md $BUILD
node scripts/fix_package_json.js package.json $BUILD/package.json

# Build `src` without `preset-env` for RMS
NODE_BUILD_TARGET="rms" yarn build:babel --source-maps=false --out-dir $BUILD/src

export NODE_BUILD_TARGET="12.17"
export BABEL_CONFIG="$CWD/babel.config.cjs"

# Build `src` for Node LTS
yarn build:babel --out-dir $BUILD/node

for PACKAGE in pull push utils
do
	( cd ../undercut-$PACKAGE && yarn build:babel --out-dir $BUILD/$PACKAGE --config-file $BABEL_CONFIG )
done
