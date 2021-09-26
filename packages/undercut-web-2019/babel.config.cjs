"use strict";

const { IS_TEST_ENV } = require(`@undercut/config/index.cjs`);

module.exports = {
	presets: [
		[
			`@babel/preset-env`,
			{
				corejs: 3,
				// Jest doesn't support ES Modules because of custom `require()` hooks.
				// Webpack wants to see original ESMs.
				modules: IS_TEST_ENV ? `commonjs` : false,
				// EDGE 18.1 was released in 2019, but BrowserList doesn't know that.
				// Somehow Android WebView (based on Blink) <= 77 transpile Generators.
				targets: `since 2019, edge >= 18, not android > 0`,
				useBuiltIns: `entry`,
			}
		],
		`@babel/preset-typescript`,
	],
};
