const nodeConfig = require(`@undercut/config/jest/jest.config.node.cjs`);

module.exports = {
	...nodeConfig,
	projects: [
		`.`,
		// `<rootDir>/../undercut-pull/`,
		// `<rootDir>/../undercut-push/`,
		// `<rootDir>/../undercut-utils/`,
		// `<rootDir>/../undercut-collections/`,
	],
};
