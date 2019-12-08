import { testOperationPull, testOperationPush } from "../../utils/tests.js";

import { collect as collectPull } from "../../pull/operations/collect.js";
import { collect as collectPush } from "../../push/operations/collect.js";

function testCollect(testOperation, collect) {
	expect(() => collect()).toThrow();
	expect(() => collect(() => 3)).toThrow();
	expect(() => collect(() => 3, 3)).toThrow();

	testOperation(collect, {
		args: [() => 7, () => 55],
		source: [3, 4],
		target: [55],
		callbackArgs: [[55, 3, 0], [55, 4, 1]]
	});
	testOperation(collect, {
		args: [() => 7, () => 55],
		source: [3, 4],
		target: [55],
		callbackArgs: [[]],
		callbackPosition: 1
	});
	testOperation(collect, {
		args: [(o, x, i) => (o[x] = i), () => ({})],
		source: [`a`, `b`],
		target: [{ a: 0, b: 1 }]
	});
}

describe(`collect`, () => {
	test(`pull`, () => testCollect(testOperationPull, collectPull));
	test(`push`, () => testCollect(testOperationPush, collectPush));
});
