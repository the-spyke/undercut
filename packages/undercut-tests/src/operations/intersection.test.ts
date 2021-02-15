import { expect, test } from "@jest/globals";

import { createTestOperation } from "@undercut/testing";

export function intersection(type, intersection) {
	const testOperation = createTestOperation(type);

	test(`should work [legacy]`, () => {
		testOperation(intersection, {
			source: [],
			target: []
		});
		testOperation(intersection, {
			source: [1],
			target: []
		});
		testOperation(intersection, {
			args: [[1]],
			source: [],
			target: []
		});
		testOperation(intersection, {
			args: [[5]],
			source: [2],
			target: []
		});
		testOperation(intersection, {
			args: [[1, 1, 2]],
			source: [2, 1, 2, 1],
			target: [2, 1]
		});
		testOperation(intersection, {
			args: [[1, 1, 2], [2, 7, 1], [5, 5, 2, 7]],
			source: [2, 1, 2, 1],
			target: [2]
		});
		testOperation(intersection, {
			args: [[`a`, 1, false]],
			source: [false, `a`, 2, undefined],
			target: [false, `a`]
		});
	});
}

export function intersectionBy(type, intersectionBy) {
	const testOperation = createTestOperation(type);

	test(`should throw on ivalid arguments`, () => {
		expect(() => intersectionBy()).toThrow();
		expect(() => intersectionBy([1])).toThrow();
	});

	test(`should work [legacy]`, () => {
		testOperation(intersectionBy, {
			args: [item => item.x],
			source: [],
			target: []
		});
		testOperation(intersectionBy, {
			args: [item => item.x, [{ x: 1 }, { x: 2 }, { y: 1 }]],
			source: [{ x: 2 }, { x: 3 }, { y: 1 }],
			target: [{ x: 2 }, { y: 1 }]
		});
	});
}
