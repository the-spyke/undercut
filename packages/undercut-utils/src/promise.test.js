import { describe, expect, test } from "@jest/globals";

import {
	delay,
	unwrapPromise,
	wait,
} from "./promise.js";

test(`delay`, () => {
	expect(() => delay()).toThrow();

	const timeStart = Date.now();

	return expect(delay(wait(11), 11).then(() => Date.now() - timeStart)).resolves.toBeGreaterThanOrEqual(20);
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

test(`wait`, () => {
	expect(wait()).toEqual(expect.any(Promise));

	const timeStart = Date.now();

	return expect(wait(21).then(() => Date.now() - timeStart)).resolves.toBeGreaterThanOrEqual(20);
});
