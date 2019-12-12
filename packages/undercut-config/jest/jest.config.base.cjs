"use strict";

module.exports = {
	testMatch: [
		`**/*.test.*.js`,
		`**/*.test.js`,
	],
	testPathIgnorePatterns: [
		`/build/`,
		`/coverage/`,
		`/dist/`,
		`/node_modules/`,
	],
	transform: {
		"\\.(c|m)?js$": `@undercut/config/jest/babel_jest_transformer.cjs`
	},
};
