import { testOperationPull, testOperationPush } from "@undercut/testing";

import { max as maxPull } from "../../pull/operations/max.js";
import { max as maxPush } from "../../push/operations/max.js";

function testMax(testOperation, max) {
	testOperation(max, {
		source: [],
		target: []
	});
	testOperation(max, {
		source: [1],
		target: [1]
	});
	testOperation(max, {
		source: [0],
		target: [0]
	});
	testOperation(max, {
		source: [-1],
		target: [-1]
	});
	testOperation(max, {
		source: [-4, 1, 3, 5],
		target: [5]
	});
	testOperation(max, {
		source: [1, -3, -5],
		target: [1]
	});
}

describe(`max`, () => {
	test(`pull`, () => testMax(testOperationPull, maxPull));
	test(`push`, () => testMax(testOperationPush, maxPush));
});
