import { expect, jest, test } from "@jest/globals";

import {
	close,
	asUnclosable,
} from "./coroutine";

test(`asUnclosable`, () => {
	let observer: any = {
		next: jest.fn(),
	};

	expect(asUnclosable(observer)).toEqual(expect.objectContaining({
		next: expect.any(Function),
		throw: expect.any(Function),
		return: expect.any(Function),
	}));

	observer = {
		next: jest.fn(),
		return: jest.fn(),
		throw: jest.fn(),
	};

	const unclosable = asUnclosable(observer);

	unclosable.next(123);

	expect(observer.next.mock.calls).toEqual([[123]]);
	expect(observer.return.mock.calls).toEqual([]);

	unclosable.return();

	expect(observer.return.mock.calls).toEqual([]);

	unclosable.next(54);

	expect(observer.next.mock.calls).toEqual([[123], [54]]);

	expect(() => unclosable.throw(new Error())).toThrow();

	unclosable.next(28);

	expect(observer.next.mock.calls).toEqual([[123], [54], [28]]);
});

test(`close`, () => {
	expect(() => close()).toThrow();

	const coroutine = {
		return: jest.fn(),
	};

	close(coroutine);

	expect(coroutine.return.mock.calls).toEqual([[]]);

	coroutine.return.mockClear();

	expect(coroutine.return.mock.calls).toEqual([]);

	expect(close(coroutine, c => {
		expect(c).toBe(coroutine);

		expect(coroutine.return.mock.calls).toEqual([]);

		return 777;
	})).toBe(777);

	expect(coroutine.return.mock.calls).toEqual([[]]);
});
