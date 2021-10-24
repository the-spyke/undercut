import baseConfig from "./jest.config.js";

export default {
	...baseConfig,
	projects: [
		`.`,
		`<rootDir>/../undercut-pull/`,
		`<rootDir>/../undercut-push/`,
		`<rootDir>/../undercut-struct/`,
		`<rootDir>/../undercut-utils/`,
	],
};
