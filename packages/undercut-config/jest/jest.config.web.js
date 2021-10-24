import baseConfig from "./jest.config.base.js";

export default {
	...baseConfig,
	setupFiles: [
		`@undercut/config/jest/jest.setup.web.js`,
	],
	testEnvironment: `jsdom`,
};
