/* eslint-env node */

"use strict";

const path = require(`path`);

const { PROD } = require(`@undercut/config`);

const BUILD_DIR = path.join(__dirname, `build`);

module.exports = {
	devtool: `source-map`,
	entry: {
		pull: `./pull.js`,
		push: `./push.js`,
		utils: `./utils.js`,
	},
	mode: PROD,
	module: {
		rules: [
			{
				test: /\.(c|m)?js$/,
				loader: `babel-loader`,
			}
		]
	},
	output: {
		filename: `[name].js`,
		library: [`undercut`, `[name]`],
		libraryTarget: `umd`,
		path: BUILD_DIR,
	},
	target: `web`,
};
