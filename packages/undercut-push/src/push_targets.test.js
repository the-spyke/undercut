import { expect, jest, test } from "@jest/globals";

import { noop } from "@undercut/utils/src/function.js";

import {
	toArray,
	toConsumer,
	toNull,
	toValue,
} from "./push_targets.js";

test(`toArray`, () => {
	expect(toArray()).toEqual(expect.objectContaining({
		next: expect.any(Function),
		throw: expect.any(Function),
		return: expect.any(Function),
	}));

	const target = toArray();

	expect(target.values).toEqual([]);

	target.next(4);
	target.next(2);

	expect(target.values).toEqual([4, 2]);
});

test(`toConsumer`, () => {
	expect(() => toConsumer()).toThrow();
	expect(() => toConsumer(123)).toThrow();
	expect(() => toConsumer(noop, 123)).toThrow();

	let consumer = jest.fn();
	let target = toConsumer(consumer);

	expect(target).toEqual(expect.objectContaining({
		next: expect.any(Function),
		throw: expect.any(Function),
		return: expect.any(Function),
	}));

	expect(consumer.mock.calls).toEqual([]);

	target.next(5);

	expect(consumer.mock.calls).toEqual([[5, 0]]);

	target.next(7);

	expect(consumer.mock.calls).toEqual([[5, 0], [7, 1]]);

	target.return();

	expect(consumer.mock.calls).toEqual([[5, 0], [7, 1]]);

	let finalizer = jest.fn();

	consumer = jest.fn();
	target = toConsumer(consumer, finalizer);

	expect(consumer.mock.calls).toEqual([]);
	expect(finalizer.mock.calls).toEqual([]);

	target.next(9);

	expect(consumer.mock.calls).toEqual([[9, 0]]);
	expect(finalizer.mock.calls).toEqual([]);

	target.return();

	expect(finalizer.mock.calls).toEqual([[undefined, 1]]);

	finalizer = jest.fn();
	consumer = jest.fn();
	target = toConsumer(consumer, finalizer);

	target.next(3);

	const error = new Error(`test`);

	expect(finalizer.mock.calls).toEqual([]);
	expect(() => target.throw(error)).toThrow(error);
	expect(finalizer.mock.calls).toEqual([[error, 1]]);
});

test(`toNull`, () => {
	expect(toNull()).toEqual(expect.objectContaining({
		next: expect.any(Function),
		throw: expect.any(Function),
		return: expect.any(Function),
	}));
});

test(`toValue`, () => {
	let target = toValue();

	expect(target).toEqual(expect.objectContaining({
		next: expect.any(Function),
		throw: expect.any(Function),
		return: expect.any(Function),
		value: undefined,
		hasValue: false,
	}));

	target.next(5);

	expect(target.value).toBe(5);
	expect(target.hasValue).toBe(true);

	target.next(7);

	expect(target.value).toBe(5);
	expect(target.hasValue).toBe(true);

	target.return();

	expect(target.value).toBe(5);
	expect(target.hasValue).toBe(true);

	target = toValue();

	target.return();

	expect(target.value).toBe(undefined);
	expect(target.hasValue).toBe(false);
});
