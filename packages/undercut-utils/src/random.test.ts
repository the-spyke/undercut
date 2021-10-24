import { describe, expect, test } from "@jest/globals";

import { isBoolean, isNumberValue } from "./language";

import {
	randomBoolean,
	randomDecimal,
	randomFrom,
	randomIndex,
	randomInteger,
} from "./random";

describe(`randomBoolean`, () => {
	test(`should return boolean values`, () => {
		expect(
			tryMany(() => randomBoolean())
				.every(isBoolean)
		).toBe(true);
	});

	test(`should return different results`, () => {
		expect(
			areSame(tryMany(() => randomBoolean()))
		).toBe(false);
	});
});

describe(`randomDecimal`, () => {
	test(`should throw on invalid arguments`, () => {
		// @ts-expect-error
		expect(() => randomDecimal()).toThrow();
		// @ts-expect-error
		expect(() => randomDecimal(false)).toThrow();
		// @ts-expect-error
		expect(() => randomDecimal(NaN)).toThrow();
		// @ts-expect-error
		expect(() => randomDecimal(`1`)).toThrow();
		// @ts-expect-error
		expect(() => randomDecimal(1, true)).toThrow();
		expect(() => randomDecimal(1, NaN)).toThrow();
		// @ts-expect-error
		expect(() => randomDecimal(1, `1`)).toThrow();
		expect(() => randomDecimal(7, 3)).toThrow();
	});

	test(`should return floats`, () => {
		expect(
			tryMany(() => randomDecimal(-100, 100))
				.map(v => Math.abs(v - Math.trunc(v)))
				.every(v => v > 0)
		).toBe(true);
	});

	test(`should return values in the specified range`, () => {
		expect(
			tryMany(() => randomDecimal(0, 100))
				.every(v => v >= 0 && v < 100)
		).toBe(true);
		expect(
			tryMany(() => randomDecimal(-10, 10))
				.every(v => v >= -10 && v < 10)
		).toBe(true);
		expect(
			tryMany(() => randomDecimal(-90, -10))
				.every(v => v >= -90 && v < -10)
		).toBe(true);
	});

	test(`should return different results`, () => {
		expect(
			areSame(tryMany(() => randomDecimal(-100, 100)))
		).toBe(false);
	});
});

describe(`randomFrom`, () => {
	test(`should throw on invalid arguments`, () => {
		// @ts-expect-error
		expect(() => randomFrom()).toThrow();
		// @ts-expect-error
		expect(() => randomFrom({})).toThrow();
		// @ts-expect-error
		expect(() => randomFrom({ length: -3 })).toThrow();
	});

	test(`should return an item`, () => {
		expect(
			tryMany(() => randomFrom([1, 5, 7]))
				.every(x => [1, 5, 7].includes(x))
		).toBe(true);
		expect(
			tryMany(() => randomFrom(`asdf`))
				.every(c => `asdf`.includes(c))
		).toBe(true);
	});

	test(`should return different results`, () => {
		expect(
			areSame(tryMany(() => randomFrom([1, 5, 7])))
		).toBe(false);
		expect(
			areSame(tryMany(() => randomFrom(`asdf`)))
		).toBe(false);
	});
});

describe(`randomIndex`, () => {
	test(`should throw on invalid arguments`, () => {
		// @ts-expect-error
		expect(() => randomIndex()).toThrow();
		// @ts-expect-error
		expect(() => randomIndex({})).toThrow();
		expect(() => randomIndex({ length: -3 })).toThrow();
	});

	test(`should return a number`, () => {
		expect(
			tryMany(() => randomIndex({ length: 1 }))
				.every(isNumberValue)
		).toBe(true);
		expect(
			tryMany(() => randomIndex({ length: 500 }))
				.every(isNumberValue)
		).toBe(true);
	});

	test(`should return different results`, () => {
		expect(
			areSame(tryMany(() => randomIndex({ length: 100 })))
		).toBe(false);
	});

	test(`should return an index in range between 0 and length`, () => {
		expect(
			tryMany(() => randomIndex({ length: 1 }))
				.every(i => i >= 0 && i < 1)
		).toBe(true);
		expect(
			tryMany(() => randomIndex({ length: 100 }))
				.every(i => i >= 0 && i < 100)
		).toBe(true);
	});
});

describe(`randomInteger`, () => {
	test(`should throw on invalid arguments`, () => {
		// @ts-expect-error
		expect(() => randomInteger()).toThrow();
		// @ts-expect-error
		expect(() => randomInteger(false)).toThrow();
		// @ts-expect-error
		expect(() => randomInteger(NaN)).toThrow();
		// @ts-expect-error
		expect(() => randomInteger(`1`)).toThrow();
		// @ts-expect-error
		expect(() => randomInteger(1, true)).toThrow();
		expect(() => randomInteger(1, NaN)).toThrow();
		// @ts-expect-error
		expect(() => randomInteger(1, `1`)).toThrow();
		expect(() => randomInteger(7, 3)).toThrow();
	});

	test(`should return floats`, () => {
		expect(
			tryMany(() => randomInteger(-100, 100))
				.map(v => Math.abs(v - Math.trunc(v)))
				.every(v => v === 0)
		).toBe(true);
	});

	test(`should return values in the specified range`, () => {
		expect(
			tryMany(() => randomInteger(0, 100))
				.every(v => v >= 0 && v < 100)
		).toBe(true);
		expect(
			tryMany(() => randomInteger(-10, 10))
				.every(v => v >= -10 && v < 10)
		).toBe(true);
		expect(
			tryMany(() => randomInteger(-90, -10))
				.every(v => v >= -90 && v < -10)
		).toBe(true);
	});

	test(`should return different results`, () => {
		expect(
			areSame(tryMany(() => randomInteger(-100, 100)))
		).toBe(false);
	});
});

function tryMany<R>(action: (i: number) => R) {
	const results: R[] = [];

	for (let i = 0; i < 10; i++) {
		results.push(action(i));
	}

	return results;
}

function areSame(items: Array<any>) {
	return (new Set(items)).size === 1;
}
