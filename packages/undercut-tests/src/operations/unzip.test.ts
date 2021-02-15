import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function unzip(type, unzip) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
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
	});
}

export function unzipWith(type, unzipWith) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => unzipWith()).toThrow();
	});

	test(`should work [legacy]`, () => {
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
	});

	test(`should throw on variable length arrays`, () => {
		expect(() => testOperation(unzipWith, {
			args: [item => new Array(item).fill(item)],
			source: [1, 2, 1],
		})).toThrow(`"itemsExtractor" returns variable length arrays: was 1, now 2`);
	});
}
