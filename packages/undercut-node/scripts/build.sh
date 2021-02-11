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

echo "----> Build 'node' package for '${NODE_BUILD_TARGET}'"
yarn build:babel --out-dir $BUILD/src --source-maps

export NODE_BUILD_TARGET="12.17"

echo "----> Build 'node' package for '${NODE_BUILD_TARGET}'"
yarn build:babel --out-dir $BUILD/node --source-maps

export BABEL_CONFIG="$CWD/babel.config.cjs"

for PACKAGE in pull push utils
do
	echo "----> Build '$PACKAGE' package for '${NODE_BUILD_TARGET}'"
	( cd ../undercut-$PACKAGE && yarn build:babel --out-dir $BUILD/$PACKAGE --config-file $BABEL_CONFIG --source-maps )
done
