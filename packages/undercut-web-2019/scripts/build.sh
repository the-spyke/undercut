#!/usr/bin/env bash

set -e

CWD="$( pwd )"
BUILD="$CWD/build"
PATH="$CWD/node_modules/.bin:$PATH"
OUTPUT="$BUILD/output"
UC_DIR="$( cd ../undercut && pwd )"

echo "CWD: $CWD"

rm -rf $BUILD
mkdir $BUILD
mkdir $OUTPUT

babel $UC_DIR/src --out-dir $OUTPUT/src
babel $UC_DIR/*.js --out-dir $OUTPUT
babel src --out-dir $OUTPUT/src

cd $UC_DIR
find src -name '*.js.snap' -exec cp -v --parents '{}' $OUTPUT \;

cd $CWD
cp -vr LICENSE package.json README.md $BUILD

webpack
