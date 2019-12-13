"use strict";

const { IS_TEST_ENV } = require(`@undercut/config`);

module.exports = {
	presets: [
		[
			`@babel/preset-env`,
			{
				// Jest doesn't support ES Modules because of custom `require()` hooks.
				modules: IS_TEST_ENV ? `commonjs` : false,
				targets: {
					node: `current`
				}
			}
		]
	]
};
