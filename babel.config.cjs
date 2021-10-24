"use strict";

const baseConfig = require(`@undercut/config/babel.config.base.cjs`);

module.exports = {
	...baseConfig,
	babelrcRoots: [
		`packages/*/`,
		`website/`,
	],
};
