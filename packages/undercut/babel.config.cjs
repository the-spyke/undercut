/* eslint-env node */

const presets = [
	[
		`@babel/preset-env`,
		{
			// Jest doesn't support ES Modules on Node because of custom `require()` hooks.
			modules: `commonjs`,
			targets: {
				node: `current`
			}
		}
	]
];

module.exports = {
	presets
};
