import { testOperationPull, testOperationPush } from "@undercut/testing";

import { min as minPull } from "../../pull/operations/min.js";
import { min as minPush } from "../../push/operations/min.js";

function testMin(testOperation, min) {
	testOperation(min, {
		source: [],
		target: []
	});
	testOperation(min, {
		source: [1],
		target: [1]
	});
	testOperation(min, {
		source: [0],
		target: [0]
	});
	testOperation(min, {
		source: [-1],
		target: [-1]
	});
	testOperation(min, {
		source: [-4, 1, 3, 5],
		target: [-4]
	});
	testOperation(min, {
		source: [1, -3, -5],
		target: [-5]
	});
}

describe(`min`, () => {
	test(`pull`, () => testMin(testOperationPull, minPull));
	test(`push`, () => testMin(testOperationPush, minPush));
});
