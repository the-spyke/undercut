import { targetOf, expectCallbackArgsToBe } from "../../utils/tests.js";

import { find, findIndex } from "./find.js";

test("find", () => {
	expect(() => find()).toThrow();

	expectCallbackArgsToBe(
		() => false,
		cb => targetOf(find(cb), [3, 4]),
		[3, 0], [4, 1]
	);

	const predicate = x => x === 2;

	expect(targetOf(find(predicate), [])).toEqual([]);
	expect(targetOf(find(predicate), [1])).toEqual([]);
	expect(targetOf(find(predicate), [2, 5])).toEqual([2]);
	expect(targetOf(find(predicate), [1, 0, 2, 5])).toEqual([2]);
	expect(targetOf(find(predicate), [1, -3, -5, 2])).toEqual([2]);

	const users = [
		{},
		{ name: "a" },
		{ name: "b" },
		{ name: "c" }
	];

	expect(targetOf(find(u => u.name === "b"), users)).toEqual([users[2]]);
});

test("findIndex", () => {
	expect(() => findIndex()).toThrow();

	expectCallbackArgsToBe(
		() => false,
		cb => targetOf(findIndex(cb), [3, 4]),
		[3, 0], [4, 1]
	);

	const predicate = x => x === 2;

	expect(targetOf(findIndex(predicate), [])).toEqual([]);
	expect(targetOf(findIndex(predicate), [1])).toEqual([]);
	expect(targetOf(findIndex(predicate), [2, 5])).toEqual([0]);
	expect(targetOf(findIndex(predicate), [1, 0, 2, 5])).toEqual([2]);
	expect(targetOf(findIndex(predicate), [1, -3, -5, 2])).toEqual([3]);
});
