import { expect, describe, test } from "@jest/globals";

import * as tests from "@undercut/tests";

import * as operations from "./push_operations.js";

describe(`Push Operations`, () => {
	test(`all operations should be covered by tests`, () => {
		const operationNames = Object.keys(operations).sort();
		const testNames = Object.keys(tests).sort();

		expect(testNames).toEqual(operationNames);
	});

	// eslint-disable-next-line import/namespace
	describe.each(Object.entries(operations))(`%s`, (name, operation) => tests[name](`push`, operation));
});
