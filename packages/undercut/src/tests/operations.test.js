import { pullOperationNames, pushOperationNames } from "../operation_lists.js";

import * as pullOperations from "../pull/pull_operations.js";
import * as pushOperations from "../push/push_operations.js";

describe("operations", () => {
	test("pull", () => {
		expect(Object.keys(pullOperations).sort()).toEqual(pullOperationNames);
	});

	test("push", () => {
		expect(Object.keys(pushOperations).sort()).toEqual(pushOperationNames);
	});
});
