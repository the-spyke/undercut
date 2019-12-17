"use strict";

module.exports = {
	presets: [
		[
			`@babel/preset-env`,
			{
				modules: `commonjs`,
				targets: {
					node: `10.13`
				}
			}
		]
	],
	sourceMaps: `inline`,
};
