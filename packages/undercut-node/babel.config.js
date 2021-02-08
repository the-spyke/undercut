import { IS_TEST_ENV, NODE_BUILD_TARGET, RMS } from "@undercut/config";

console.log(`----> NODE_BUILD_TARGET=${NODE_BUILD_TARGET}`);

export default {
	plugins: [
		!IS_TEST_ENV && [
			`babel-plugin-module-resolver`,
			{
				alias: {
					"^@undercut/(?!node)(.+)$": `@undercut/node/\\1`,
				},
				loglevel: `silent`,
			}
		]
	].filter(Boolean),
	presets: [
		NODE_BUILD_TARGET !== RMS && [
			`@babel/preset-env`,
			{
				corejs: 3,
				// Jest doesn't support ES Modules because of custom `require()` hooks.
				// modules: IS_TEST_ENV ? `commonjs` : false,
				modules: false,
				targets: {
					node: NODE_BUILD_TARGET
				},
				useBuiltIns: `entry`,
			}
		]
	].filter(Boolean),
};
