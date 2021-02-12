import webConfig from "@undercut/config/jest/jest.config.web.js";

export default {
	...webConfig,
	projects: [
		`.`,
		`<rootDir>/../undercut-pull/`,
		`<rootDir>/../undercut-push/`,
		`<rootDir>/../undercut-utils/`,
	]
};
