import {
	delay,
	unwrap,
} from "./promise.js";

test("delay", () => {
	expect(delay()).toEqual(expect.any(Promise));

	const timeStart = Date.now();

	return expect(delay(21).then(() => Date.now() - timeStart)).resolves.toBeGreaterThanOrEqual(20);
});

describe("unwrap", () => {
	test("should return a promise and its resolve/reject handlers", () => {
		expect(unwrap()).toEqual(expect.objectContaining({
			promise: expect.any(Promise),
			resolve: expect.any(Function),
			reject: expect.any(Function),
		}));
	});

	test("should resolve promise on executing the resolve handler", () => {
		const promiseInfo = unwrap();

		promiseInfo.resolve(234);

		return expect(promiseInfo.promise).resolves.toBe(234);
	});

	test("should reject promise on executing the reject handler", () => {
		const promiseInfo = unwrap();

		promiseInfo.reject(123);

		return expect(promiseInfo.promise).rejects.toBe(123);
	});
});
