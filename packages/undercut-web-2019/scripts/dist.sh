#!/usr/bin/env bash

set -e

CWD="$( pwd )"
BUILD="$CWD/build"
DIST="$CWD/dist"
PATH="$CWD/node_modules/.bin:$PATH"

echo "CWD: $CWD"

test -d $BUILD

rm -rf $DIST
mkdir $DIST

cd $DIST
npm pack $BUILD
