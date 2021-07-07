import { expect, describe, test } from "@jest/globals";

import * as tests from "@undercut/tests";

import { pullArray } from "./pull_core";
import * as operations from "./pull_operations";

describe(`Pull Operations`, () => {
	test(`all operations should be covered by tests`, () => {
		const operationNames = Object.keys(operations).sort();
		const testNames = Object.keys(tests).sort();

		expect(testNames).toEqual(operationNames);
	});

	describe.each(Object.entries(operations))(`%s`, (name, operation) => (tests as any)[name](`pull`, operation, pullArray));
});
