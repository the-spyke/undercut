import config from "../index.cjs";

export default {
	collectCoverageFrom: [
		`**/*.?(c|m)js`,
	],
	coveragePathIgnorePatterns: config.IGNORE_PATTERNS,
	modulePathIgnorePatterns: config.IGNORE_PATTERNS,
	testMatch: [
		`**/*.test.*.?(c|m)js`,
		`**/*.test.?(c|m)js`,
	],
	testPathIgnorePatterns: config.IGNORE_PATTERNS,
	transform: {
		"\\.(c|m)?js$": `@undercut/config/jest/babel_jest_transformer.cjs`
	},
};
