import {
	pull, pullLine,
	range,
	filter, map, min, skip, sum, take,
	toArray, toObject, toValue
} from "./pull.js";

test("simple pull scenarios", () => {
	const data1 = [1, 2, 3, 4, 5, 6, 7];
	const pipeline1 = [
		map(x => x + 3),
		skip(1),
		take(100),
		map(x => x - 3),
		filter(x => x !== 4),
	];

	expect(
		pull(toArray, pipeline1, data1)
	).toEqual([2, 3, 5, 6, 7]);

	expect(
		pull(toArray, [
			...pipeline1,
			sum(),
			map(x => x + 0.5),
		], data1)
	).toEqual([23.5]);

	expect(
		toArray(pullLine(pipeline1, data1))
	).toEqual([2, 3, 5, 6, 7]);

	const pullLine1 = pullLine(pipeline1, data1);

	expect(
		pull(toValue, [
			sum(),
			map(x => x + 0.5)
		], pullLine1)
	).toEqual(23.5);

	expect(
		pull(toArray, [min()], data1)
	).toEqual([1]);

	expect(
		pull(toObject, [
			filter(e => e[1] > 10)
		], Object.entries({
			a: 1,
			b: 2,
			c: 12,
			e: 15,
			d: 7
		}))
	).toEqual({ c: 12, e: 15 });

	const data2 = [1, 2, 3];
	const pullLine2 = pullLine(pipeline1, data2);

	data2.push(5, 6);

	expect(
		Array.from(pullLine2)
	).toEqual([2, 3, 5, 6]);

	expect(
		pull(toArray, [map(x => 2 ** x)], range(0, 3))
	).toEqual([1, 2, 4]);
});
