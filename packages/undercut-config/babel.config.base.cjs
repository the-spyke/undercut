"use strict";

const { IS_TEST_ENV, NODE_BUILD_TARGET, RMS } = require(`./index.cjs`);

module.exports = {
	plugins: [
		!IS_TEST_ENV && [
			`babel-plugin-add-import-extension`,
			{
				extension: `js`,
			}
		],
	].filter(Boolean),
	presets: [
		`@babel/preset-typescript`,
		NODE_BUILD_TARGET !== RMS && [
			`@babel/preset-env`,
			{
				corejs: 3,
				// Jest doesn't support ES Modules because of custom `require()` hooks.
				modules: IS_TEST_ENV ? `commonjs` : false,
				targets: {
					node: NODE_BUILD_TARGET
				},
				useBuiltIns: `entry`,
			}
		],

	].filter(Boolean),
};
