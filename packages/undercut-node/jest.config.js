// import nodeConfig from "@undercut/config/jest/jest.config.node.cjs";

const IGNORE_PATTERNS = [
	`/build/`,
	`/coverage/`,
	`/dist/`,
	`/node_modules/`,
	`\\.config\\.(c|m)?js`,
];

export default {
	collectCoverageFrom: [
		`**/*.?(c|m)js`,
	],
	coveragePathIgnorePatterns: IGNORE_PATTERNS,
	coverageProvider: `v8`,
	moduleFileExtensions: [`js`, `cjs`, `mjs`, `json`, `jsx`, `ts`, `tsx`, `node`],
	testMatch: [
		`**/*.test.*.?(c|m)js`,
		`**/*.test.?(c|m)js`,
	],
	testPathIgnorePatterns: IGNORE_PATTERNS,
	transform: {
		"\\.(c|m)?js$": `<rootDir>/babel_jest_transformer.js`
	},
	setupFiles: [
		// `@undercut/config/jest/jest.setup.node.js`,
		`core-js/es/index.js`,
	],
	testEnvironment: `node`,
	// ...nodeConfig,
	projects: [
		`.`,
		// `<rootDir>/../undercut-pull/`,
		// `<rootDir>/../undercut-push/`,
		// `<rootDir>/../undercut-utils/`,
		// `<rootDir>/../undercut-collections/`,
	],
};
