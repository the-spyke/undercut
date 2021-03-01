import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
// @ts-expect-error
import PromiseMock from "promise-mock";

import {
	delay,
	unwrapPromise,
	wait,
} from "./promise";

declare global {
	interface PromiseConstructor {
		runAll(): void;
	}
}

describe(`delay`, () => {
	beforeEach(() => {
		jest.useFakeTimers();
		PromiseMock.install();
	});

	afterEach(() => {
		PromiseMock.uninstall();
		jest.useRealTimers();
	});

	test(`should throw on no arguments`, () => {
		// @ts-expect-error
		expect(() => delay()).toThrow();
	});

	test(`should return a new promise settling after "time" ms later`, () => {
		const callback = jest.fn();

		delay(Promise.resolve(7), 111).then(callback, callback);

		Promise.runAll();
		jest.advanceTimersByTime(110);

		expect(() => Promise.runAll()).toThrow();
		expect(callback).not.toHaveBeenCalled();

		jest.advanceTimersByTime(1);
		Promise.runAll();

		expect(callback).toHaveBeenCalledWith(7);
		expect(jest.getTimerCount()).toBe(0);
	});
});

describe(`unwrapPromise`, () => {
	test(`should return a promise and its resolve/reject handlers`, () => {
		expect(unwrapPromise()).toEqual(expect.objectContaining({
			promise: expect.any(Promise),
			resolve: expect.any(Function),
			reject: expect.any(Function),
		}));
	});

	test(`should resolve promise on executing the resolve handler`, () => {
		const promiseInfo = unwrapPromise();

		promiseInfo.resolve(234);

		return expect(promiseInfo.promise).resolves.toBe(234);
	});

	test(`should reject promise on executing the reject handler`, () => {
		const promiseInfo = unwrapPromise();

		promiseInfo.reject(123);

		return expect(promiseInfo.promise).rejects.toBe(123);
	});
});

describe(`wait`, () => {
	beforeEach(() => {
		jest.useFakeTimers();
		PromiseMock.install();
	});

	afterEach(() => {
		PromiseMock.uninstall();
		jest.useRealTimers();
	});

	test(`should work without arguments`, () => {
		expect(wait()).toEqual(expect.any(Promise));
	});

	test(`should wait the specifiet amount of time`, () => {
		const callback = jest.fn();

		wait(111).then(callback, callback);

		jest.advanceTimersByTime(110);

		expect(() => Promise.runAll()).toThrow();
		expect(callback).not.toHaveBeenCalled();

		jest.advanceTimersByTime(1);
		Promise.runAll();

		expect(callback).toHaveBeenCalled();
		expect(jest.getTimerCount()).toBe(0);
	});
});
