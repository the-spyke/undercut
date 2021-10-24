import baseConfig from "@undercut/config/jest/jest.config.base.js";

export default {
	...baseConfig,
	projects: [
		`<rootDir>/packages/undercut-cli/`,
		// `<rootDir>/packages/undercut-config/`, -- Should have no tests.
		`<rootDir>/packages/undercut-node/`,
		// `<rootDir>/packages/undercut-perf/`, -- Performance tests must be in a separate job (very slow).
		`<rootDir>/packages/undercut-pull/`,
		`<rootDir>/packages/undercut-push/`,
		`<rootDir>/packages/undercut-struct/`,
		`<rootDir>/packages/undercut-testing/`,
		`<rootDir>/packages/undercut-types/`,
		// `<rootDir>/packages/undercut-tests/`, -- Tests are run from their packages.
		`<rootDir>/packages/undercut-utils/`,
		// `<rootDir>/packages/undercut-web-2019/`, -- Should be tested from a JSDOM environment.
	],
};
