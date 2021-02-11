"use strict";

const PROD = `production`;
const DEV = `development`;
const RMS = `rms`;
const TEST = `test`;

const IS_PROD_ENV = process.env.NODE_ENV === PROD;
const IS_TEST_ENV = process.env.NODE_ENV === TEST;
const IS_DEV_ENV = !IS_PROD_ENV && !IS_TEST_ENV;

const NODE_BUILD_TARGET = process.env.NODE_BUILD_TARGET || `current`;
const NODE_LTS_VERSION = `12.17`;

const IGNORE_PATTERNS = [
	`/build/`,
	`/coverage/`,
	`/dist/`,
	`/node_modules/`,
	`\\.config\\.(c|m)?js`,
];

module.exports = {
	DEV,
	IGNORE_PATTERNS,
	IS_DEV_ENV,
	IS_PROD_ENV,
	IS_TEST_ENV,
	NODE_BUILD_TARGET,
	NODE_LTS_VERSION,
	PROD,
	RMS,
	TEST,
};
