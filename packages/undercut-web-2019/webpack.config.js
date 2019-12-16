/* eslint-env node */

"use strict";

const path = require(`path`);

const { PROD } = require(`@undercut/config`);

const BUILD_DIR = path.join(__dirname, `build`);

module.exports = {
	devtool: `source-map`,
	entry: {
		pull: `@undercut/pull`,
		push: `@undercut/push`,
		utils: `@undercut/utils`,
	},
	mode: PROD,
	output: {
		filename: `[name].js`,
		library: [`undercut`, `[name]`],
		libraryTarget: `umd`,
		path: BUILD_DIR,
	},
};
