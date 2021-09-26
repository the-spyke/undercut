import { expect, describe, test } from "@jest/globals";

import * as tests from "@undercut/tests";

import { pushArray } from "./push_core";
import * as operations from "./push_operations";

describe(`Push Operations`, () => {
	test(`all operations should be covered by tests`, () => {
		const operationNames = Object.keys(operations).sort();
		const testNames = Object.keys(tests).sort();

		expect(testNames).toEqual(operationNames);
	});

	// eslint-disable-next-line jest/valid-describe
	describe.each(Object.entries(operations))(`%s`, (name, operation) => (tests as any)[name](`push`, operation, pushArray));
});
