"use strict";

const nodeConfig = require(`@undercut/config/jest/jest.config.node.cjs`);

module.exports = {
	...nodeConfig,
	setupFiles: [
		`./src/polyfills.js`,
	],
};
