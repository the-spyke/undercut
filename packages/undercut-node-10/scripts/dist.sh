#!/usr/bin/env bash

set -e

CWD="$( pwd )"
PATH="$CWD/node_modules/.bin:$PATH"
BUILD="$CWD/build"
DIST="$CWD/dist"

test -f "$BUILD/pull.js"

rm -rf $DIST
mkdir $DIST

cd $DIST
npm pack $BUILD
