import nodeConfig from "@undercut/config/jest/jest.config.node.js";

export default {
	...nodeConfig,
	setupFiles: [
		`./src/polyfills.js`,
	],
};
