import { IGNORE_PATTERNS } from "../index.cjs";

export default {
	collectCoverageFrom: [
		`**/*.(js|ts)`,
	],
	coveragePathIgnorePatterns: IGNORE_PATTERNS,
	coverageProvider: `v8`,
	injectGlobals: false,
	moduleFileExtensions: [`js`, `cjs`, `mjs`, `json`, `jsx`, `ts`, `tsx`, `node`],
	testMatch: [
		`**/*.test?(.*).(js|ts)`,
	],
	testPathIgnorePatterns: IGNORE_PATTERNS,
	testRunner: `jest-circus/runner`,
	transform: {
		"\\.(js|cjs|mjs|ts)$": `@undercut/config/jest/babel_jest_transformer.cjs`
	},
	transformIgnorePatterns: [],
};
