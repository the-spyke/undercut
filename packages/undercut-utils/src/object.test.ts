import { describe, expect, test, jest } from "@jest/globals";

import {
	collectProps,
	filterProps,
	mapKeys,
	mapValues,
	reduceProps,
} from "./object";

describe(`collectProps`, () => {
	test(`should fail on invalid arguments`, () => {
		// @ts-expect-error
		expect(() => collectProps()).toThrow();
		// @ts-expect-error
		expect(() => collectProps(null)).toThrow();
		// @ts-expect-error
		expect(() => collectProps({ x: 1 })).toThrow();
		// @ts-expect-error
		expect(() => collectProps(123, () => true)).toThrow();
		// @ts-expect-error
		expect(() => collectProps(null, () => true)).toThrow();
		// @ts-expect-error
		expect(() => collectProps({ x: 1 }, 123)).toThrow();
	});

	test(`should pass collection, key, value, index as arguments`, () => {
		const predicate = jest.fn();
		const collection = new Map();

		collectProps({ x: 1, a: 2, s: null }, predicate, collection);

		expect(predicate.mock.calls).toEqual([
			[collection, `x`, 1, 0],
			[collection, `a`, 2, 1],
			[collection, `s`, null, 2],
		]);
	});

	test(`should work on empty objects`, () => {
		expect(collectProps({}, () => true)).toEqual({});
		expect(collectProps({}, () => true, null)).toEqual(null);
	});

	test(`should collect props`, () => {
		expect(collectProps({ x: 1, a: 2, s: null }, () => true)).toEqual({});
		expect(collectProps({ x: 1, a: 2, s: null }, (c, k, v) => (c[k] = v))).toEqual({ x: 1, a: 2, s: null });
		expect(collectProps({ x: 1, a: 2, s: null }, (c, k, v) => c.set(k, v), new Map())).toEqual(new Map([[`x`, 1], [`a`, 2], [`s`, null]]));
		expect(collectProps({ x: 1, a: 2, s: null }, (c, k, v, i) => (c[k] = i))).toEqual({ x: 0, a: 1, s: 2 });
	});
});

describe(`filterProps`, () => {
	test(`should fail on invalid arguments`, () => {
		// @ts-expect-error
		expect(() => filterProps()).toThrow();
		// @ts-expect-error
		expect(() => filterProps(null)).toThrow();
		// @ts-expect-error
		expect(() => filterProps({ x: 1 })).toThrow();
		// @ts-expect-error
		expect(() => filterProps(123, () => true)).toThrow();
		// @ts-expect-error
		expect(() => filterProps(null, () => true)).toThrow();
		// @ts-expect-error
		expect(() => filterProps({ x: 1 }, 123)).toThrow();
	});

	test(`should pass key, value, index as arguments`, () => {
		const predicate = jest.fn();

		filterProps({ x: 1, a: 2, s: null }, predicate as any);

		expect(predicate.mock.calls).toEqual([
			[`x`, 1, 0],
			[`a`, 2, 1],
			[`s`, null, 2],
		]);
	});

	test(`should work on empty objects`, () => {
		expect(filterProps({}, () => true)).toEqual({});
	});

	test(`should filter props`, () => {
		expect(filterProps({ x: 1, a: 2, s: null }, () => true)).toEqual({ x: 1, a: 2, s: null });
		expect(filterProps({ x: 1, a: 2, s: null }, () => false)).toEqual({});
		// @ts-expect-error
		expect(filterProps({ x: 1, a: 2, s: null }, k => k !== `y`)).toEqual({ x: 1, a: 2, s: null });
		expect(filterProps({ x: 1, a: 2, s: null }, k => k !== `x`)).toEqual({ a: 2, s: null });
		expect(filterProps({ x: 1, a: 2, s: null }, (k, v) => v === null)).toEqual({ s: null });
		expect(filterProps({ x: 1, a: 2, s: null }, (k, v, i) => i === 1)).toEqual({ a: 2 });
	});
});

describe(`mapKeys`, () => {
	test(`should fail on invalid arguments`, () => {
		// @ts-expect-error
		expect(() => mapKeys()).toThrow();
		// @ts-expect-error
		expect(() => mapKeys(null)).toThrow();
		// @ts-expect-error
		expect(() => mapKeys({ x: 1 })).toThrow();
		// @ts-expect-error
		expect(() => mapKeys(123, () => true)).toThrow();
		// @ts-expect-error
		expect(() => mapKeys(null, () => true)).toThrow();
		// @ts-expect-error
		expect(() => mapKeys({ x: 1 }, 123)).toThrow();
	});

	test(`should pass key, value, index as arguments`, () => {
		const predicate = jest.fn(k => k);

		mapKeys({ x: 1, a: 2, s: null }, predicate as any);

		expect(predicate.mock.calls).toEqual([
			[`x`, 1, 0],
			[`a`, 2, 1],
			[`s`, null, 2],
		]);
	});

	test(`should work on empty objects`, () => {
		expect(mapKeys({}, k => k)).toEqual({});
	});

	test(`should map keys`, () => {
		expect(mapKeys({ x: 1, a: 2, s: null }, k => k)).toEqual({ x: 1, a: 2, s: null });
		expect(mapKeys({ x: 1, a: 2, s: null }, (k, v, i) => `${k}_${v}_${i}`)).toEqual({ x_1_0: 1, a_2_1: 2, s_null_2: null });
	});
});

describe(`mapValues`, () => {
	test(`should fail on invalid arguments`, () => {
		// @ts-expect-error
		expect(() => mapValues()).toThrow();
		// @ts-expect-error
		expect(() => mapValues(null)).toThrow();
		// @ts-expect-error
		expect(() => mapValues({ x: 1 })).toThrow();
		// @ts-expect-error
		expect(() => mapValues(123, () => true)).toThrow();
		// @ts-expect-error
		expect(() => mapValues(null, () => true)).toThrow();
		// @ts-expect-error
		expect(() => mapValues({ x: 1 }, 123)).toThrow();
	});

	test(`should pass key, value, index as arguments`, () => {
		const predicate = jest.fn(k => k);

		mapValues({ x: 1, a: 2, s: null }, predicate);

		expect(predicate.mock.calls).toEqual([
			[`x`, 1, 0],
			[`a`, 2, 1],
			[`s`, null, 2],
		]);
	});

	test(`should work on empty objects`, () => {
		expect(mapValues({}, k => k)).toEqual({});
	});

	test(`should map values`, () => {
		expect(mapValues({ x: 1, a: 2, s: null }, (k, v) => v)).toEqual({ x: 1, a: 2, s: null });
		expect(mapValues({ x: 1, a: 2, s: null }, (k, v, i) => `${k}_${v}_${i}`)).toEqual({ x: `x_1_0`, a: `a_2_1`, s: `s_null_2` });
	});
});

describe(`reduceProps`, () => {
	test(`should fail on invalid arguments`, () => {
		// @ts-expect-error
		expect(() => reduceProps()).toThrow();
		// @ts-expect-error
		expect(() => reduceProps(null)).toThrow();
		// @ts-expect-error
		expect(() => reduceProps({ x: 1 })).toThrow();
		// @ts-expect-error
		expect(() => reduceProps(123, () => true)).toThrow();
		// @ts-expect-error
		expect(() => reduceProps(null, () => true)).toThrow();
		// @ts-expect-error
		expect(() => reduceProps({ x: 1 }, 123)).toThrow();
	});

	test(`should pass previous, key, value, index as arguments`, () => {
		const predicate = jest.fn((acc: any, k, v, i) => acc + i);

		reduceProps({ x: 1, a: 2, s: null }, predicate, 47);

		expect(predicate.mock.calls).toEqual([
			[47, `x`, 1, 0],
			[47, `a`, 2, 1],
			[48, `s`, null, 2],
		]);
	});

	test(`should work on empty objects`, () => {
		expect(reduceProps({}, acc => acc, {})).toEqual({});
		expect(reduceProps({}, acc => acc, null)).toEqual(null);
	});

	test(`should reduce props`, () => {
		// @ts-expect-error
		expect(reduceProps({ x: 1, a: 2, s: null }, (acc, k) => k)).toEqual(`s`);
		expect(reduceProps({ x: 1, a: 2, s: null }, (acc, k, v, i) => `${acc}_${k}${v}${i}`, `47`)).toEqual(`47_x10_a21_snull2`);
	});
});
