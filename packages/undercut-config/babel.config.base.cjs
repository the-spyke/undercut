"use strict";

const { IS_TEST_ENV, NODE_BUILD_TARGET, RMS } = require(`./index.cjs`);

module.exports = {
	plugins: [
		!IS_TEST_ENV && [
			`babel-plugin-add-import-extension`,
			{
				extension: `js`,
				replace: true,
				observedScriptExtensions: [`ts`],
			}
		],
	].filter(Boolean),
	presets: [
		NODE_BUILD_TARGET !== RMS && [
			`@babel/preset-env`,
			{
				corejs: 3,
				// Jest doesn't support ES Modules because of custom `require()` hooks.
				modules: IS_TEST_ENV ? `commonjs` : false,
				useBuiltIns: `entry`,
			}
		],
		`@babel/preset-typescript`,
	].filter(Boolean),
	targets: {
		node: NODE_BUILD_TARGET
	},
};
