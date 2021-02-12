import nodeConfig from "@undercut/config/jest/jest.config.node.js";

export default {
	...nodeConfig,
	moduleNameMapper: {
		"^@undercut/node/(\\w+)$": `@undercut/node/exports/$1.js`,
	},
};
