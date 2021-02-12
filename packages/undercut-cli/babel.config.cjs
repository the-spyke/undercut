"use strict";

const { IS_TEST_ENV, NODE_LTS_VERSION } = require(`@undercut/config/index.cjs`);

module.exports = {
	presets: [
		[
			`@babel/preset-env`,
			{
				corejs: 3,
				// Jest doesn't support ES Modules because of custom `require()` hooks.
				modules: IS_TEST_ENV ? `commonjs` : false,
				targets: {
					node: NODE_LTS_VERSION
				},
				useBuiltIns: `entry`,
			}
		]
	],
};
