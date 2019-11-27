/* eslint-env node */

"use strict";

const IS_TEST_ENV = process.env.NODE_ENV === `test`;

module.exports = IS_TEST_ENV
	? {
		plugins: [
			// Jest doesn't support ES Modules on Node because of custom `require()` hooks.
			`@babel/plugin-transform-modules-commonjs`,
		],
	}
	: {
		presets: [
			[
				`@babel/preset-env`,
				{
					modules: false,
					// EDGE 18.1 was released in 2019, but BrowserList doesn't know that.
					// Somehow Android WebView (based on Blink) <= 77 transpile Generators.
					targets: `since 2019, edge >= 18, not android > 0`,
				}
			]
		],
		sourceMaps: `inline`,
	};
