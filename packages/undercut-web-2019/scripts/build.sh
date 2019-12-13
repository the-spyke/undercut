#!/usr/bin/env bash

set -e

CWD="$( pwd )"
PATH="$CWD/node_modules/.bin:$PATH"
BUILD="$CWD/build"

rm -rf $BUILD
mkdir $BUILD

cp -vr LICENSE package.json README.md $BUILD

webpack
