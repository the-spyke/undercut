#!/usr/bin/env bash

set -e

CWD="$( pwd )"
PATH="$CWD/node_modules/.bin:$PATH"

eslint --format="unix" "**/*.?(c|m)js" $@
