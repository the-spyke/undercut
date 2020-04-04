/* eslint-env node */

import webConfig from "@undercut/config/jest/jest.config.web.js";
import { referRootProjects } from "@undercut/config/jest/jest_config_helpers.js";

export default {
	...webConfig,
	projects: [
		`.`,
		...referRootProjects(),
	]
};
