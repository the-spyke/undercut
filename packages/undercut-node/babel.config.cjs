"use strict";

const { IS_TEST_ENV } = require(`@undercut/config`);
const baseConfig = require(`@undercut/config/babel.config.base.cjs`);

module.exports = {
	...baseConfig,
	babelrcRoots: [`../*/`],
	plugins: [
		...(baseConfig.plugins || []),
		!IS_TEST_ENV && [
			`babel-plugin-module-resolver`,
			{
				alias: {
					"^@undercut/(?!node)(.+)$": `@undercut/node/\\1`,
				},
				loglevel: `silent`,
			}
		],
	].filter(Boolean),
};
