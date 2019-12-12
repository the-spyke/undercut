"use strict";

const nodeConfig = require(`@undercut/config/jest/jest.config.node.cjs`);

module.exports = {
	...nodeConfig,
	transform: {
		// Disable JS transforms as all code should be pre-compiled on build.
	},
};
