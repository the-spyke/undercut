import { expect, test } from "@jest/globals";

import {
	push,
	filter, map, skip, sum, take,
	toArray,
} from "@undercut/push";

test(`simple push scenarios`, () => {
	const data1 = [1, 2, 3, 4, 5, 6, 7];
	const pipeline1 = [
		map(x => x + 3),
		skip(1),
		take(100),
		map(x => x - 3),
		filter(x => x !== 4),
	];

	expect(
		push(toArray(), pipeline1, data1).values
	).toEqual([2, 3, 5, 6, 7]);

	expect(
		push(toArray(), [
			...pipeline1,
			sum(),
			map(x => x + 0.5),
		], data1).values
	).toEqual([23.5]);
});
