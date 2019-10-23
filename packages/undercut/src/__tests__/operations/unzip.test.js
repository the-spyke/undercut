import { testPull, testPush, testOperationPull, testOperationPush } from "../../utils/tests.js";

import { unzip as unzipPull, unzipWith as unzipWithPull } from "../../pull/operations/unzip.js";
import { unzip as unzipPush, unzipWith as unzipWithPush } from "../../push/operations/unzip.js";

function testUnzip(testOperation, unzip) {
	testOperation(unzip, {
		source: [],
		target: []
	});
	testOperation(unzip, {
		source: [[1, 1]],
		target: [[1], [1]]
	});
	testOperation(unzip, {
		source: [[undefined, 1]],
		target: [[undefined], [1]]
	});
	testOperation(unzip, {
		source: [[1, undefined]],
		target: [[1], [undefined]]
	});
	testOperation(unzip, {
		source: [[undefined, undefined]],
		target: [[undefined], [undefined]]
	});
	testOperation(unzip, {
		source: [[1, 2, 3], [4, 5, 6]],
		target: [[1, 4], [2, 5], [3, 6]]
	});
	testOperation(unzip, {
		source: [[1, 2, 3], [4, 5, 6]],
		target: [[1, 4], [2, 5], [3, 6]]
	});
}

describe(`unzip`, () => {
	test(`pull`, () => testUnzip(testOperationPull, unzipPull));
	test(`push`, () => testUnzip(testOperationPush, unzipPush));
});

function testUnzipWith(testOperation, unzipWith) {
	expect(() => unzipWith()).toThrow();

	testOperation(unzipWith, {
		args: [() => [6, 7]],
		source: [3, 4],
		target: [[6, 6], [7, 7]],
		callbackArgs: [[3, 0], [4, 1]]
	});
	testOperation(unzipWith, {
		args: [x => x],
		source: [],
		target: []
	});
	testOperation(unzipWith, {
		args: [x => x],
		source: [[1, 1]],
		target: [[1], [1]]
	});
	testOperation(unzipWith, {
		args: [item => item.split(`,`).map(Number)],
		source: [`1,2,3`, `4,5,6`],
		target: [[1, 4], [2, 5], [3, 6]]
	});
}

describe(`unzipWith`, () => {
	test(`pull`, () => {
		testUnzipWith(testOperationPull, unzipWithPull);

		expect(() => testPull(
			unzipWithPull(item => new Array(item).fill(item)),
			[1, 2, 1]
		)).toThrow(`"itemsExtractor" returns variable length arrays: was 1, now 2`);
	});
	test(`push`, () => {
		testUnzipWith(testOperationPush, unzipWithPush);

		expect(() => testPush(
			unzipWithPush(item => new Array(item).fill(item)),
			[1, 2, 1]
		)).toThrow(`"itemsExtractor" returns variable length arrays: was 1, now 2`);
	});
});
