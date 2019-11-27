/* eslint-env node */

"use strict";

const path = require(`path`);

const BUILD_DIR = path.join(__dirname, `build`);

module.exports = {
	devtool: `source-map`,
	entry: {
		pull: `./build/output/pull.js`,
		push: `./build/output/push.js`,
		utils: `./build/output/utils.js`,
	},
	mode: `production`,
	output: {
		path: BUILD_DIR,
		filename: `undercut.[name].js`,
		library: [`undercut`, `[name]`],
		libraryTarget: `umd`,
	},
};
