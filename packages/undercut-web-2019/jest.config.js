/* eslint-env node */

import webConfig from "@undercut/config/jest/jest.config.web.cjs";

export default {
	...webConfig,
	projects: [
		`.`,
		`<rootDir>/../undercut-pull/`,
		`<rootDir>/../undercut-push/`,
		`<rootDir>/../undercut-utils/`,
	]
};
