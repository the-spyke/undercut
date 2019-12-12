"use strict";

const baseConfig = require(`./jest.config.base.cjs`);

module.exports = {
	...baseConfig,
	setupFiles: [
		`@undercut/config/jest/jest.setup.node.js`,
	],
	testEnvironment: `node`,
};
