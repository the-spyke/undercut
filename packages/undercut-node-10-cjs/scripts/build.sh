#!/usr/bin/env bash

set -e

CWD="$( pwd )"
BUILD="$CWD/build"
PATH="$CWD/node_modules/.bin:$PATH"
UC_DIR="$( cd ../undercut && pwd )"

echo "CWD: $CWD"

rm -rf $BUILD
mkdir $BUILD

babel $UC_DIR/src --out-dir $BUILD/src
babel $UC_DIR/*.js --out-dir $BUILD

cd $UC_DIR
find src -name '*.js.snap' -exec cp -v --parents '{}' $BUILD \;
cp -v src/.npmignore $BUILD/src
cp -v LICENSE $BUILD

cd $CWD
cp -vr src jest.config.json package.json README.md $BUILD
