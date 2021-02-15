import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function difference(type, difference) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(difference, {
			source: [],
			target: []
		});
		testOperation(difference, {
			source: [1],
			target: [1]
		});
		testOperation(difference, {
			args: [[1]],
			source: [],
			target: []
		});
		testOperation(difference, {
			args: [[5]],
			source: [2],
			target: [2]
		});
		testOperation(difference, {
			args: [[1, 1, 2]],
			source: [2, 1, 2, 1],
			target: []
		});
		testOperation(difference, {
			args: [[7, 1], [5, 5, 7]],
			source: [2, 1, 2, 1],
			target: [2, 2]
		});
		testOperation(difference, {
			args: [[`b`, 1], [`c`, true, 2], [undefined]],
			source: [false, `a`],
			target: [false, `a`]
		});
	});
}

export function differenceBy(type, differenceBy) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => differenceBy()).toThrow();
		expect(() => differenceBy([1])).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(differenceBy, {
			args: [x => x.prop],
			source: [],
			target: []
		});
		testOperation(differenceBy, {
			args: [x => x.prop, [{ x: 1 }]],
			source: [{ x: 2 }],
			target: []
		});
		testOperation(differenceBy, {
			args: [x => x.prop, [{ prop: 3 }, { prop: 2 }]],
			source: [{ prop: 1 }, { x: 1 }, { prop: 2 }],
			target: [{ prop: 1 }, { x: 1 }]
		});
	});
}

export function symmetricDifference(type, symmetricDifference) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(symmetricDifference, {
			source: [],
			target: []
		});
		testOperation(symmetricDifference, {
			source: [1],
			target: [1]
		});
		testOperation(symmetricDifference, {
			args: [[1]],
			source: [],
			target: [1]
		});
		testOperation(symmetricDifference, {
			args: [[5]],
			source: [2],
			target: [2, 5]
		});
		testOperation(symmetricDifference, {
			args: [[1, 2, 3]],
			source: [3, 4, 5],
			target: [4, 5, 1, 2]
		});
		testOperation(symmetricDifference, {
			args: [[0, 1, 2, 3], [3, 2, 7, 6]],
			source: [3, 4, 1, 6],
			target: [3, 4, 0, 7]
		});
	});
}

export function symmetricDifferenceBy(type, symmetricDifferenceBy) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => symmetricDifferenceBy()).toThrow();
		expect(() => symmetricDifferenceBy([1])).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(symmetricDifferenceBy, {
			args: [x => x.prop],
			source: [],
			target: []
		});
		testOperation(symmetricDifferenceBy, {
			args: [x => x.prop, [{ x: 1 }, { prop: 1 }]],
			source: [{ x: 2 }, { prop: 2 }],
			target: [{ prop: 2 }, { prop: 1 }]
		});
	});
}
