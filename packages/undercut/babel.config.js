/* eslint-env node */

const presets = [
	[
		"@babel/preset-env",
		{
			corejs: 3,
			// Jest doesn't support ES Modules on Node because of custom `require()` hooks.
			modules: "commonjs",
			targets: {
				node: "current"
			},
			useBuiltIns: "usage"
		}
	]
];

module.exports = {
	presets
};
