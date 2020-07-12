/* eslint-env node */

"use strict";

const webConfig = require(`@undercut/config/jest/jest.config.web.cjs`);

module.exports = {
	...webConfig,
	projects: [
		`.`,
		`<rootDir>/../undercut-pull/`,
		`<rootDir>/../undercut-push/`,
		`<rootDir>/../undercut-utils/`,
	]
};
