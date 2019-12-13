/* eslint-env node */

"use strict";

const webConfig = require(`@undercut/config/jest/jest.config.web.cjs`);
const { referRootProjects } = require(`@undercut/config/jest/jest_config_helpers.cjs`);

module.exports = {
	...webConfig,
	projects: [
		`.`,
		...referRootProjects()
	]
};
