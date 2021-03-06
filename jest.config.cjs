"use strict";

module.exports = {
	projects: [
		// `<rootDir>/packages/undercut-cli/`, -- Should be tested from a Node 10 environment.
		`<rootDir>/packages/undercut-collections/`,
		// `<rootDir>/packages/undercut-config/`, -- Should have no tests.
		// `<rootDir>/packages/undercut-node-10/`, -- Should be tested from a Node 10 environment.
		// `<rootDir>/packages/undercut-perf/`, -- Performance tests must be in a separate job (very slow).
		`<rootDir>/packages/undercut-pull/`,
		`<rootDir>/packages/undercut-push/`,
		`<rootDir>/packages/undercut-testing/`,
		// `<rootDir>/packages/undercut-tests/`, -- Tests are run from their packages.
		`<rootDir>/packages/undercut-utils/`,
		// `<rootDir>/packages/undercut-web-2019/`, -- Should be tested from a JSDOM environment.
	],
};
