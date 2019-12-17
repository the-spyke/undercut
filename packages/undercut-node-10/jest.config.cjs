"use strict";

const nodeConfig = require(`@undercut/config/jest/jest.config.node.cjs`);
const { referRootProjects } = require(`@undercut/config/jest/jest_config_helpers.cjs`);

module.exports = {
	...nodeConfig,
	projects: [
		`.`,
		...referRootProjects([`undercut-cli`]),
	],
};
