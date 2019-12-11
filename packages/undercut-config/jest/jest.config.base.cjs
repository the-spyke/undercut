module.exports = {
	testMatch: [
		`**/*.test.*.js`,
		`**/*.test.js`,
	],
	testPathIgnorePatterns: [
		`/build/`,
		`/coverage/`,
		`/dist/`,
		`/node_modules/`,
	],
};
