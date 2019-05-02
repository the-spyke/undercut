import { targetOf } from "../../utils/tests.js";

import {
	difference,
	differenceBy,
	symmetricDifference,
	symmetricDifferenceBy
} from "./difference.js";

test("difference", () => {
	expect(targetOf(difference(), [])).toEqual([]);
	expect(targetOf(difference(), [1])).toEqual([1]);
	expect(targetOf(difference([1]), [])).toEqual([]);
	expect(targetOf(difference([5]), [2])).toEqual([2]);
	expect(targetOf(difference([1, 1, 2]), [2, 1, 2, 1])).toEqual([]);
	expect(targetOf(difference([7, 1], [5, 5, 7]), [2, 1, 2, 1])).toEqual([2, 2]);
	expect(targetOf(difference(["b", 1], ["c", true, 2], [undefined]), [false, "a"])).toEqual([false, "a"]);
});

test("differenceBy", () => {
	expect(() => differenceBy()).toThrow();
	expect(() => differenceBy([1])).toThrow();

	expect(targetOf(differenceBy(x => x.prop), [])).toEqual([]);
	expect(targetOf(differenceBy(x => x.prop, [{ x: 1 }]), [{ x: 2 }])).toEqual([]);
	expect(targetOf(differenceBy(x => x.prop, [{ prop: 3 }, { prop: 2 }]), [{ prop: 1 }, { x: 1 }, { prop: 2 }])).toEqual([{ prop: 1 }, { x: 1 }]);
});

test("symmetricDifference", () => {
	expect(targetOf(symmetricDifference(), [])).toEqual([]);
	expect(targetOf(symmetricDifference(), [1])).toEqual([1]);
	expect(targetOf(symmetricDifference([1]), [])).toEqual([1]);
	expect(targetOf(symmetricDifference([5]), [2])).toEqual([2, 5]);
	expect(targetOf(symmetricDifference([1, 2, 3]), [3, 4, 5])).toEqual([4, 5, 1, 2]);
	expect(targetOf(symmetricDifference([0, 1, 2, 3], [3, 2, 7, 6]), [3, 4, 1, 6])).toEqual([3, 4, 0, 7]);
});

test("symmetricDifferenceBy", () => {
	expect(() => symmetricDifferenceBy()).toThrow();
	expect(() => symmetricDifferenceBy([1])).toThrow();

	expect(targetOf(symmetricDifferenceBy(x => x.prop), [])).toEqual([]);
	expect(targetOf(symmetricDifferenceBy(x => x.prop, [{ x: 1 }, { prop: 1 }]), [{ x: 2 }, { prop: 2 }])).toEqual([{ prop: 2 }, { prop: 1 }]);
});
