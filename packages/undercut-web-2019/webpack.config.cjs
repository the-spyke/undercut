/* eslint-env node */

"use strict";

const path = require(`path`);

const { PROD } = require(`@undercut/config/index.cjs`);

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
				test: /\.(cjs|js|jsx|mjs|ts|tsx)$/,
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
	resolve: {
		extensions: [`.cjs`, `.js`, `.jsx`, `.mjs`, `.ts`, `.tsx`],
	},
	target: `web`,
};
