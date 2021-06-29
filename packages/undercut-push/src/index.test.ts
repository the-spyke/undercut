import { describe, expect, test } from "@jest/globals";

import * as exports from "./index";

import {
	push,
	filter, map, skip, sum, take,
	toArray,
} from "./index";

describe(`Push`, () => {
	test(`exports of the main "push" entry should be stable`, () => {
		expect(Object.keys(exports).sort()).toMatchSnapshot();
	});

	test(`simple push scenarios`, () => {
		const data1 = [1, 2, 3, 4, 5, 6, 7];
		const pipeline1 = [
			map<number>(x => x + 3),
			skip(1),
			take(100),
			map<number>(x => x - 3),
			filter<number>(x => x !== 4),
		];

		expect(
			push(toArray(), pipeline1, data1).values
		).toEqual([2, 3, 5, 6, 7]);

		expect(
			push(toArray(), [
				...pipeline1,
				sum(),
				map<number>(x => x + 0.5),
			], data1).values
		).toEqual([23.5]);
	});
});
