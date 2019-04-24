/* eslint-env node */

const presets = [
	[
		"@babel/preset-env",
		{
			corejs: 3,
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
