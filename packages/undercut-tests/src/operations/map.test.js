import { testOperationPull, testOperationPush } from "@undercut/testing";

import { map as mapPull } from "../../pull/operations/map.js";
import { map as mapPush } from "../../push/operations/map.js";

function testMap(testOperation, map) {
	expect(() => map()).toThrow();

	testOperation(map, {
		args: [() => 3],
		source: [],
		target: []
	});
	testOperation(map, {
		args: [() => 3],
		source: [1, 2],
		target: [3, 3],
		callbackArgs: [[1, 0], [2, 1]]
	});
	testOperation(map, {
		args: [x => x * 2],
		source: [1, -1, 3],
		target: [2, -2, 6]
	});
}

describe(`map`, () => {
	test(`pull`, () => testMap(testOperationPull, mapPull));
	test(`push`, () => testMap(testOperationPush, mapPush));
});
