import { describe, expect, test } from "@jest/globals";

import { testOperationPull, testOperationPush } from "@undercut/testing";
import { desc } from "@undercut/utils/src/ordering.js";

import { sort as sortPull, sortNumbers as sortNumbersPull, sortStrings as sortStringsPull } from "@undercut/pull/src/operations/sort.js";
import { sort as sortPush, sortNumbers as sortNumbersPush, sortStrings as sortStringsPush } from "@undercut/push/src/operations/sort.js";

function testSort(testOperation, sort) {
	expect(() => testOperation(sort, {
		args: [(a, b) => a - b, 32],
		source: [4, 1, 2],
		target: [1, 2, 4]
	})).toThrow();

	testOperation(sort, {
		args: [(a, b) => a - b],
		source: [4, 1, 2],
		target: [1, 2, 4]
	});

	testOperation(sort, {
		args: [(a, b) => a - b, desc],
		source: [4, 1, 2],
		target: [4, 2, 1]
	});
}

describe(`sort`, () => {
	test(`pull`, () => testSort(testOperationPull, sortPull));
	test(`push`, () => testSort(testOperationPush, sortPush));
});

function testSortNumbers(testOperation, sortNumbers) {
	testOperation(sortNumbers, {
		source: [],
		target: []
	});
	testOperation(sortNumbers, {
		source: [1],
		target: [1]
	});
	testOperation(sortNumbers, {
		source: [2, 1, 3],
		target: [1, 2, 3]
	});
	testOperation(sortNumbers, {
		source: [2, 1, -3],
		target: [-3, 1, 2]
	});
	testOperation(sortNumbers, {
		args: [desc],
		source: [2, 1, -3],
		target: [2, 1, -3]
	});
}

describe(`sortNumbers`, () => {
	test(`pull`, () => testSortNumbers(testOperationPull, sortNumbersPull));
	test(`push`, () => testSortNumbers(testOperationPush, sortNumbersPush));
});

function testSortStrings(testOperation, sortStrings) {
	testOperation(sortStrings, {
		source: [],
		target: []
	});
	testOperation(sortStrings, {
		source: [``],
		target: [``]
	});
	testOperation(sortStrings, {
		source: [`z`, `a`, `c`],
		target: [`a`, `c`, `z`]
	});
	testOperation(sortStrings, {
		source: [`51`, `5`, `10`, `1`],
		target: [`1`, `10`, `5`, `51`]
	});
	testOperation(sortStrings, {
		args: [desc],
		source: [`z`, `a`, `c`],
		target: [`z`, `c`, `a`]
	});
}

describe(`sortStrings`, () => {
	test(`pull`, () => testSortStrings(testOperationPull, sortStringsPull));
	test(`push`, () => testSortStrings(testOperationPush, sortStringsPush));
});
