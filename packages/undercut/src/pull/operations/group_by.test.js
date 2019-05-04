import { identity } from "../../utils/function.js";
import { callbackArgsOf, targetOf } from "../../utils/tests.js";

import { groupBy } from "./group_by.js";

test("groupBy", () => {
	expect(() => groupBy()).toThrow();
	expect(callbackArgsOf(
		() => 1,
		cb => targetOf(groupBy(cb), [3, 4])
	)).toEqual([[3, 0], [4, 1]]);
	expect(targetOf(groupBy(identity), [])).toEqual([]);
	expect(targetOf(
		groupBy(x => Math.trunc(x / 10)),
		[0, 1, 4, 8, 10, 15, 42]
	)).toEqual([
		[0, [0, 1, 4, 8]],
		[1, [10, 15]],
		[4, [42]]
	]);

	const users = [
		{ groupId: 1, name: "Tom" },
		{ groupId: 3, name: "John" },
		{ groupId: 2, name: "Sam" },
		{ groupId: 1, name: "Ann" },
		{ groupId: 2, name: "Dan" },
	];

	expect(targetOf(
		groupBy(u => u.groupId),
		users
	)).toEqual([
		[1, [users[0], users[3]]],
		[3, [users[1]]],
		[2, [users[2], users[4]]]
	]);
});
