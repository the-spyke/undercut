import nodeConfig from "@undercut/config/jest/jest.config.node.js";
import { referRootProjects } from "@undercut/config/jest/jest_config_helpers.js";

export default {
	...nodeConfig,
	projects: [
		`.`,
		...referRootProjects(),
	],
};
