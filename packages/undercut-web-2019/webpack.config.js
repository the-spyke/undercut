/* eslint-env node */

"use strict";

const path = require(`path`);

const { PROD } = require(`@undercut/config`);

const BUILD_DIR = path.join(__dirname, `build`);

module.exports = {
	devtool: `source-map`,
	entry: {
		pull: `@undercut/pull/index.js`,
		push: `@undercut/push/index.js`,
		utils: `@undercut/utils/index.js`,
	},
	mode: PROD,
	output: {
		path: BUILD_DIR,
		library: [`undercut`, `[name]`],
		libraryTarget: `umd`,
	},
};
