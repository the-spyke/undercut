import baseConfig from "./jest.config.js";

export default {
	...baseConfig,
	projects: [
		`.`,
		`<rootDir>/../undercut-collections/`,
		`<rootDir>/../undercut-pull/`,
		`<rootDir>/../undercut-push/`,
		`<rootDir>/../undercut-utils/`,
	],
};
