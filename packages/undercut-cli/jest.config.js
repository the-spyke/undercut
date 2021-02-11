import nodeConfig from "@undercut/config/jest/jest.config.node.cjs";

export default {
	...nodeConfig,
	moduleNameMapper: {
		"^@undercut/node/(\\w+)$": `@undercut/node/exports/$1.js`,
	},
	setupFiles: [
		`./src/polyfills.js`,
	],
};
