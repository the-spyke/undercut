import * as compare from "../../utils/compare.js";
import { identity } from "../../utils/function.js";
import { targetOf } from "../../utils/tests.js";

import { orderBy, asc, desc } from "./order_by.js";

test("asc", () => {
	const selector = x => x;

	expect(() => asc()).toThrow();
	expect(asc(compare.numbers)).toEqual([identity, 1, compare.numbers]);
	expect(asc(compare.numbers, selector)).toEqual([selector, 1, compare.numbers]);
});

test("desc", () => {
	const selector = x => x;

	expect(() => desc()).toThrow();
	expect(desc(compare.numbers)).toEqual([identity, -1, compare.numbers]);
	expect(desc(compare.numbers, selector)).toEqual([selector, -1, compare.numbers]);
});

test("orderBy", () => {
	expect(targetOf(orderBy(), [])).toEqual([]);

	expect(targetOf(orderBy(
		asc(compare.numbers)
	), [])).toEqual([]);

	expect(targetOf(orderBy(
		asc(compare.numbers)
	), [4, 1, 2])).toEqual([1, 2, 4]);

	expect(targetOf(orderBy(
		desc(compare.numbers)
	), [4, 1, 2])).toEqual([4, 2, 1]);

	const users = [
		{ id: 0, name: "Tom", posts: 32 },
		{ id: 1, name: "John", posts: 12 },
		{ id: 2, name: "Sam", posts: 1 },
		{ id: 3, name: "John", posts: 5 },
		{ id: 4, name: "Admin", posts: 1 },
	];

	expect(targetOf(orderBy(
		asc(compare.strings, u => u.name)
	), users)).toEqual([users[4], users[1], users[3], users[2], users[0]]);

	expect(targetOf(orderBy(
		desc(compare.strings, u => u.name)
	), users)).toEqual([users[0], users[2], users[1], users[3], users[4]]);

	expect(targetOf(orderBy(
		asc(compare.numbers, u => u.posts)
	), users)).toEqual([users[2], users[4], users[3], users[1], users[0]]);

	expect(targetOf(orderBy(
		desc(compare.numbers, u => u.posts)
	), users)).toEqual([users[0], users[1], users[3], users[2], users[4]]);

	expect(targetOf(orderBy(
		asc(compare.strings, u => u.name),
		asc(compare.numbers, u => u.posts)
	), users)).toEqual([users[4], users[3], users[1], users[2], users[0]]);

	expect(targetOf(orderBy(
		asc(compare.strings, u => u.name),
		desc(compare.numbers, u => u.posts)
	), users)).toEqual([users[4], users[1], users[3], users[2], users[0]]);

	expect(targetOf(orderBy(
		desc(compare.strings, u => u.name),
		desc(compare.numbers, u => u.posts)
	), users)).toEqual([users[0], users[2], users[1], users[3], users[4]]);

	expect(targetOf(orderBy(
		desc(compare.strings, u => u.name),
		asc(compare.numbers, u => u.posts)
	), users)).toEqual([users[0], users[2], users[3], users[1], users[4]]);

	expect(targetOf(orderBy(
		asc(compare.numbers, u => u.posts),
		asc(compare.strings, u => u.name)
	), users)).toEqual([users[4], users[2], users[3], users[1], users[0]]);

	expect(targetOf(orderBy(
		asc(compare.numbers, u => u.posts),
		desc(compare.strings, u => u.name)
	), users)).toEqual([users[2], users[4], users[3], users[1], users[0]]);

	expect(targetOf(orderBy(
		desc(compare.numbers, u => u.posts),
		desc(compare.strings, u => u.name)
	), users)).toEqual([users[0], users[1], users[3], users[2], users[4]]);

	expect(targetOf(orderBy(
		desc(compare.numbers, u => u.posts),
		asc(compare.strings, u => u.name)
	), users)).toEqual([users[0], users[1], users[3], users[4], users[2]]);
});
