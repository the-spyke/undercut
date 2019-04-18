import { identity } from "../../utils/function.js";
import { targetOf } from "../../utils/tests.js";

import { zip, zipWith } from "./zip.js";

test("zip", () => {
	expect(targetOf(
		zip(),
		[]
	)).toEqual([]);

	expect(targetOf(
		zip([]),
		[]
	)).toEqual([]);

	expect(targetOf(
		zip([]),
		[1]
	)).toEqual([[1, undefined]]);

	expect(targetOf(
		zip([], []),
		[1]
	)).toEqual([[1, undefined, undefined]]);

	expect(targetOf(
		zip([1], []),
		[1]
	)).toEqual([[1, 1, undefined]]);

	expect(targetOf(
		zip([], [1]),
		[1]
	)).toEqual([[1, undefined, 1]]);

	expect(targetOf(
		zip([1], [1]),
		[1]
	)).toEqual([[1, 1, 1]]);

	expect(targetOf(
		zip([5, 6, 7]),
		[1, 2, 3]
	)).toEqual([[1, 5], [2, 6], [3, 7]]);

	expect(targetOf(
		zip([5, 6, 7]),
		[1, 2, 3, 4]
	)).toEqual([[1, 5], [2, 6], [3, 7], [4, undefined]]);

	expect(targetOf(
		zip([5, 6, 7, 8]),
		[1, 2, 3]
	)).toEqual([[1, 5], [2, 6], [3, 7], [undefined, 8]]);
});

test("zipWith", () => {
	expect(() => zipWith()).toThrow();

	expect(targetOf(
		zipWith(identity, []),
		[]
	)).toEqual([]);

	expect(targetOf(
		zipWith(identity, []),
		[1]
	)).toEqual([[1, undefined]]);

	expect(targetOf(
		zipWith(identity, [1]),
		[]
	)).toEqual([[undefined, 1]]);

	expect(targetOf(
		zipWith(values => values.join(), [3, 4], [5, 6]),
		[1, 2]
	)).toEqual(["1,3,5", "2,4,6"]);
});
