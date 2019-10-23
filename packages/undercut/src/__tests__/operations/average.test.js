import { testOperationPull, testOperationPush } from "../../utils/tests.js";

import { average as averagePull } from "../../pull/operations/average.js";
import { average as averagePush } from "../../push/operations/average.js";

function testAverage(testOperation, average) {
	testOperation(average, {
		source: [],
		target: [0]
	});
	testOperation(average, {
		source: [0],
		target: [0]
	});
	testOperation(average, {
		source: [1],
		target: [1]
	});
	testOperation(average, {
		source: [0, 0],
		target: [0]
	});
	testOperation(average, {
		source: [1, 3, 5, 1],
		target: [2.5]
	});
}

describe(`average`, () => {
	test(`pull`, () => testAverage(testOperationPull, averagePull));
	test(`push`, () => testAverage(testOperationPush, averagePush));
});
