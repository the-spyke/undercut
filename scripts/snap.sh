#!/usr/bin/env bash

set -e

CWD="$( pwd )"
PATH="$CWD/node_modules/.bin:$PATH"
BUILD="$CWD/snap-build"

rm -rf $BUILD
mkdir -p $BUILD

yarn workspace @undercut/node build
yarn workspace @undercut/node dist
cp -v ./packages/undercut-node/dist/*.tgz $BUILD

yarn workspace @undercut/cli build
yarn workspace @undercut/cli dist
cp -v ./packages/undercut-cli/dist/*.tgz $BUILD

export RELEASE_GRADE="devel"

if [ -z "${RELEASE_VERSION_BASE+x}" ]; then
	export RELEASE_VERSION_BASE="$(./node_modules/.bin/json version < lerna.json)"
fi

if [ -z "${RELEASE_VERSION_FULL+x}" ]; then
	export RELEASE_VERSION_FULL="$RELEASE_VERSION_BASE+git.$(git rev-parse --short HEAD)"
fi

echo $RELEASE_GRADE > $BUILD/release-grade
echo $RELEASE_VERSION_BASE > $BUILD/version-base
echo $RELEASE_VERSION_FULL > $BUILD/version-full

snapcraft
