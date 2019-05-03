import { targetOf } from "../../utils/tests.js";

import { intersection, intersectionBy } from "./intersection.js";

test("intersection", () => {
	expect(targetOf(intersection(), [])).toEqual([]);
	expect(targetOf(intersection(), [1])).toEqual([]);
	expect(targetOf(intersection([1]), [])).toEqual([]);
	expect(targetOf(intersection([5]), [2])).toEqual([]);
	expect(targetOf(intersection([1, 1, 2]), [2, 1, 2, 1])).toEqual([2, 1]);
	expect(targetOf(intersection([1, 1, 2], [2, 7, 1], [5, 5, 2, 7]), [2, 1, 2, 1])).toEqual([2]);
	expect(targetOf(intersection(["a", 1, false]), [false, "a", 2, undefined])).toEqual([false, "a"]);
});

test("intersectionBy", () => {
	expect(() => intersectionBy()).toThrow();
	expect(() => intersectionBy([1])).toThrow();

	const selector = item => item.x;

	expect(targetOf(intersectionBy(selector), [])).toEqual([]);
	expect(targetOf(intersectionBy(selector, [{ x: 1 }, { x: 2 }, { y: 1 }]), [{ x: 2 }, { x: 3 }, { y: 1 }])).toEqual([{ x: 2 }, { y: 1 }]);
});
