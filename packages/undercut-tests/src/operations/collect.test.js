import { describe, expect, test } from "@jest/globals";

import { createBySpec } from "@undercut/testing";

import * as pullOps from "@undercut/pull/src/operations/collect.js";
import * as pushOps from "@undercut/push/src/operations/collect.js";

describe(`collect`, () => {
	describe.each([
		[`pull`, pullOps.collect],
		[`push`, pushOps.collect],
	])(`%s`, (type, collect) => {
		const bySpec = createBySpec(type, collect);

		test(`should throw on invalid or missing args`, () => {
			expect(() => collect()).toThrow();
			expect(() => collect(() => 3)).toThrow();
			expect(() => collect(() => 3, 3)).toThrow();
		});
		test(`should pass collection + item + index into the collector`, () => bySpec({
			args: [() => 7, () => 55],
			source: [3, 4],
			callbackArgs: [[55, 3, 0], [55, 4, 1]]
		}));
		test(`should not pass anyhing into the factory`, () => bySpec({
			args: [() => 7, () => 55],
			source: [3, 4],
			callbackArgs: [[]],
			callbackPosition: 1
		}));
		test(`should work`, () => bySpec({
			args: [(o, x, i) => (o[x] = i), () => ({})],
			source: [`a`, `b`],
			target: [{ a: 0, b: 1 }]
		}));
	});
});

describe(`collectArray`, () => {
	describe.each([
		[`pull`, pullOps.collectArray],
		[`push`, pushOps.collectArray],
	])(`%s`, (type, collectArray) => {
		const bySpec = createBySpec(type, collectArray);

		test(`should work with an empty source`, () => bySpec({
			source: [],
			target: [[]]
		}));
		test(`should collect all numbers into an array`, () => bySpec({
			source: [1, 2, 3],
			target: [[1, 2, 3]]
		}));
		test(`should collect all items of any type into an array`, () => bySpec({
			source: [false, `a`, 3],
			target: [[false, `a`, 3]]
		}));
	});
});

describe(`collectMap`, () => {
	describe.each([
		[`pull`, pullOps.collectMap],
		[`push`, pushOps.collectMap],
	])(`%s`, (type, collectMap) => {
		const bySpec = createBySpec(type, collectMap);

		test(`should work with an empty source`, () => bySpec({
			source: [],
			target: [new Map()]
		}));
		test(`should collect all entries with numeric keys into a map`, () => bySpec({
			source: [[1, 11], [2, 22], [3, 33]],
			target: [new Map([[1, 11], [2, 22], [3, 33]])]
		}));
		test(`should collect all entries with any keys into a map`, () => bySpec({
			source: [[false, 11], [`a`, 22], [{}, 3]],
			target: [new Map([[false, 11], [`a`, 22], [{}, 3]])]
		}));
	});
});

describe(`collectObject`, () => {
	describe.each([
		[`pull`, pullOps.collectObject],
		[`push`, pushOps.collectObject],
	])(`%s`, (type, collectObject) => {
		const bySpec = createBySpec(type, collectObject);

		test(`should work with an empty source`, () => bySpec({
			source: [],
			target: [{}]
		}));
		test(`should collect all entries with numeric keys into an object`, () => bySpec({
			source: [[1, 11], [2, 22], [3, 33]],
			target: [{ 1: 11, 2: 22, 3: 33 }]
		}));
		test(`should collect all entries into an object by stringifying key values`, () => bySpec({
			source: [[false, 11], [`a`, 22], [44, 3]],
			target: [{ "false": 11, "a": 22, "44": 3 }]
		}));
	});
});

describe(`collectSet`, () => {
	describe.each([
		[`pull`, pullOps.collectSet],
		[`push`, pushOps.collectSet],
	])(`%s`, (type, collectSet) => {
		const bySpec = createBySpec(type, collectSet);

		test(`should work with an empty source`, () => bySpec({
			source: [],
			target: [new Set()]
		}));
		test(`should collect all items into a set`, () => bySpec({
			source: [1, 2, 3],
			target: [new Set([1, 2, 3])]
		}));
		test(`should collect all items of any type into a set`, () => bySpec({
			source: [false, `a`, 3],
			target: [new Set([false, `a`, 3])]
		}));
	});
});
