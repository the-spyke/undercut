"use strict";

const PROD = `production`;
const DEV = `development`;
const TEST = `test`;

const IS_PROD_ENV = process.env.NODE_ENV === PROD;
const IS_TEST_ENV = process.env.NODE_ENV === TEST;
const IS_DEV_ENV = !IS_PROD_ENV && !IS_TEST_ENV;

const IGNORE_PATTERNS = [
	`/build/`,
	`/coverage/`,
	`/dist/`,
	`/node_modules/`,
];

module.exports = {
	DEV,
	IGNORE_PATTERNS,
	IS_DEV_ENV,
	IS_PROD_ENV,
	IS_TEST_ENV,
	PROD,
	TEST,
};
