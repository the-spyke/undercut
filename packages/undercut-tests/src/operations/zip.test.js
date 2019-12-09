import { testOperationPull, testOperationPush } from "@undercut/testing";

import { zip as zipPull, zipWith as zipWithPull } from "../../pull/operations/zip.js";
import { zip as zipPush, zipWith as zipWithPush } from "../../push/operations/zip.js";

function testZip(testOperation, zip) {
	testOperation(zip, {
		source: [],
		target: []
	});
	testOperation(zip, {
		args: [[]],
		source: [],
		target: []
	});
	testOperation(zip, {
		args: [[]],
		source: [1],
		target: [[1, undefined]]
	});
	testOperation(zip, {
		args: [[], []],
		source: [1],
		target: [[1, undefined, undefined]]
	});
	testOperation(zip, {
		args: [[1], []],
		source: [1],
		target: [[1, 1, undefined]]
	});
	testOperation(zip, {
		args: [[], [1]],
		source: [1],
		target: [[1, undefined, 1]]
	});
	testOperation(zip, {
		args: [[1], [1]],
		source: [1],
		target: [[1, 1, 1]]
	});
	testOperation(zip, {
		args: [[5, 6, 7]],
		source: [1, 2, 3],
		target: [[1, 5], [2, 6], [3, 7]]
	});
	testOperation(zip, {
		args: [[5, 6, 7]],
		source: [1, 2, 3, 4],
		target: [[1, 5], [2, 6], [3, 7], [4, undefined]]
	});
	testOperation(zip, {
		args: [[5, 6, 7, 8]],
		source: [1, 2, 3],
		target: [[1, 5], [2, 6], [3, 7], [undefined, 8]]
	});
}

describe(`zip`, () => {
	test(`pull`, () => testZip(testOperationPull, zipPull));
	test(`push`, () => testZip(testOperationPush, zipPush));
});

function testZipWith(testOperation, zipWith) {
	expect(() => zipWith()).toThrow();

	testOperation(zipWith, {
		args: [() => 42, [1, 2]],
		source: [3, 4],
		target: [42, 42],
		callbackArgs: [[[3, 1], 0], [[4, 2], 1]]
	});

	testOperation(zipWith, {
		args: [x => x, []],
		source: [],
		target: []
	});
	testOperation(zipWith, {
		args: [x => x, []],
		source: [1],
		target: [[1, undefined]]
	});
	testOperation(zipWith, {
		args: [x => x, [1]],
		source: [],
		target: [[undefined, 1]]
	});
	testOperation(zipWith, {
		args: [values => values.join(), [3, 4], [5, 6]],
		source: [1, 2],
		target: [`1,3,5`, `2,4,6`]
	});
}

describe(`zipWith`, () => {
	test(`pull`, () => testZipWith(testOperationPull, zipWithPull));
	test(`push`, () => testZipWith(testOperationPush, zipWithPush));
});
