"use strict";

module.exports = {
	presets: [
		[
			`@babel/preset-env`,
			{
				corejs: 3,
				modules: `commonjs`,
				targets: {
					node: `10.13`
				},
				useBuiltIns: `entry`,
			}
		]
	],
};
