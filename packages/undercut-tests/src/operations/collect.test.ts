import { expect, test } from "@jest/globals";

import { createExpectBySpec } from "@undercut/testing";

export function collect(type, collect) {
	const expectBySpec = createExpectBySpec(type, collect);

	test(`should throw on invalid or missing args`, () => {
		expect(() => collect()).toThrow();
		expect(() => collect(() => 3)).toThrow();
		expect(() => collect(() => 3, 3)).toThrow();
	});

	test(`should pass collection + item + index into the collector`, () => {
		expectBySpec({
			args: [() => 7, () => 55],
			source: [3, 4],
			callbackArgs: [[55, 3, 0], [55, 4, 1]]
		});
	});

	test(`should not pass anyhing into the factory`, () => {
		expectBySpec({
			args: [() => 7, () => 55],
			source: [3, 4],
			callbackArgs: [[]],
			callbackPosition: 1
		});
	});

	test(`should work`, () => {
		expectBySpec({
			args: [(o, x, i) => (o[x] = i), () => ({})],
			source: [`a`, `b`],
			target: [{ a: 0, b: 1 }]
		});
	});
}

export function collectArray(type, collectArray) {
	const expectBySpec = createExpectBySpec(type, collectArray);

	test(`should work with an empty source`, () => {
		expectBySpec({
			args: [],
			source: [],
			target: [[]]
		});
	});

	test(`should collect all numbers into an array`, () => {
		expectBySpec({
			args: [],
			source: [1, 2, 3],
			target: [[1, 2, 3]]
		});
	});

	test(`should collect all items of any type into an array`, () => {
		expectBySpec({
			args: [],
			source: [false, `a`, 3],
			target: [[false, `a`, 3]]
		});
	});
}

export function collectMap(type, collectMap) {
	const expectBySpec = createExpectBySpec(type, collectMap);

	test(`should work with an empty source`, () => {
		expectBySpec({
			args: [],
			source: [],
			target: [new Map()]
		});
	});

	test(`should collect all entries with numeric keys into a map`, () => {
		expectBySpec({
			args: [],
			source: [[1, 11], [2, 22], [3, 33]],
			target: [new Map([[1, 11], [2, 22], [3, 33]])]
		});
	});

	test(`should collect all entries with any keys into a map`, () => {
		expectBySpec({
			args: [],
			source: [[false, 11], [`a`, 22], [{}, 3]],
			target: [new Map<any, any>([[false, 11], [`a`, 22], [{}, 3]])]
		});
	});
}

export function collectObject(type, collectObject) {
	const expectBySpec = createExpectBySpec(type, collectObject);

	test(`should work with an empty source`, () => {
		expectBySpec({
			args: [],
			source: [],
			target: [{}]
		});
	});

	test(`should collect all entries with numeric keys into an object`, () => {
		expectBySpec({
			args: [],
			source: [[1, 11], [2, 22], [3, 33]],
			target: [{ 1: 11, 2: 22, 3: 33 }]
		});
	});

	test(`should collect all entries into an object by stringifying key values`, () => {
		expectBySpec({
			args: [],
			source: [[false, 11], [`a`, 22], [44, 3]],
			target: [{ "false": 11, "a": 22, "44": 3 }]
		});
	});
}

export function collectSet(type, collectSet) {
	const expectBySpec = createExpectBySpec(type, collectSet);

	test(`should work with an empty source`, () => {
		expectBySpec({
			args: [],
			source: [],
			target: [new Set()]
		});
	});

	test(`should collect all items into a set`, () => {
		expectBySpec({
			args: [],
			source: [1, 2, 3],
			target: [new Set([1, 2, 3])]
		});
	});

	test(`should collect all items of any type into a set`, () => {
		expectBySpec({
			args: [],
			source: [false, `a`, 3],
			target: [new Set([false, `a`, 3])]
		});
	});
}
