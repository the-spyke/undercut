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
		expect(() => collectProps()).toThrow();
		expect(() => collectProps(null)).toThrow();
		expect(() => collectProps({ x: 1 })).toThrow();
		expect(() => collectProps(123, () => true)).toThrow();
		expect(() => collectProps(null, () => true)).toThrow();
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
		expect(() => filterProps()).toThrow();
		expect(() => filterProps(null)).toThrow();
		expect(() => filterProps({ x: 1 })).toThrow();
		expect(() => filterProps(123, () => true)).toThrow();
		expect(() => filterProps(null, () => true)).toThrow();
		expect(() => filterProps({ x: 1 }, 123)).toThrow();
	});

	test(`should pass key, value, index as arguments`, () => {
		const predicate = jest.fn();

		filterProps({ x: 1, a: 2, s: null }, predicate);

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
		expect(filterProps({ x: 1, a: 2, s: null }, k => k !== `y`)).toEqual({ x: 1, a: 2, s: null });
		expect(filterProps({ x: 1, a: 2, s: null }, k => k !== `x`)).toEqual({ a: 2, s: null });
		expect(filterProps({ x: 1, a: 2, s: null }, (k, v) => v === null)).toEqual({ s: null });
		expect(filterProps({ x: 1, a: 2, s: null }, (k, v, i) => i === 1)).toEqual({ a: 2 });
	});
});

describe(`mapKeys`, () => {
	test(`should fail on invalid arguments`, () => {
		expect(() => mapKeys()).toThrow();
		expect(() => mapKeys(null)).toThrow();
		expect(() => mapKeys({ x: 1 })).toThrow();
		expect(() => mapKeys(123, () => true)).toThrow();
		expect(() => mapKeys(null, () => true)).toThrow();
		expect(() => mapKeys({ x: 1 }, 123)).toThrow();
	});

	test(`should pass key, value, index as arguments`, () => {
		const predicate = jest.fn(k => k);

		mapKeys({ x: 1, a: 2, s: null }, predicate);

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
		expect(() => mapValues()).toThrow();
		expect(() => mapValues(null)).toThrow();
		expect(() => mapValues({ x: 1 })).toThrow();
		expect(() => mapValues(123, () => true)).toThrow();
		expect(() => mapValues(null, () => true)).toThrow();
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
		expect(() => reduceProps()).toThrow();
		expect(() => reduceProps(null)).toThrow();
		expect(() => reduceProps({ x: 1 })).toThrow();
		expect(() => reduceProps(123, () => true)).toThrow();
		expect(() => reduceProps(null, () => true)).toThrow();
		expect(() => reduceProps({ x: 1 }, 123)).toThrow();
	});

	test(`should pass previous, key, value, index as arguments`, () => {
		const predicate = jest.fn((acc, k, v, i) => acc + i);

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
		expect(reduceProps({ x: 1, a: 2, s: null }, (acc, k) => k)).toEqual(`s`);
		expect(reduceProps({ x: 1, a: 2, s: null }, (acc, k, v, i) => `${acc}_${k}${v}${i}`, 47)).toEqual(`47_x10_a21_snull2`);
	});
});
