/* eslint-env node */

const IS_TEST_ENV = process.env.NODE_ENV === `test`;

module.exports = {
	presets: [
		[
			`@babel/preset-env`,
			{
				// Jest doesn't support ES Modules on Node because of custom `require()` hooks.
				modules: IS_TEST_ENV ? `commonjs` : false,
				targets: {
					node: `current`
				}
			}
		]
	]
};
