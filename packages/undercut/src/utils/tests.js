export function targetOf(operation, source) {
	return [...operation(source)];
}

export function expectCallbackArgsToBe(cb, setup, ...calls) {
	const callback = jest.fn(cb);

	setup(callback);

	expect(callback.mock.calls.length).toBe(calls.length);

	calls.forEach((call, i) => {
		const providedArgs = callback.mock.calls[i];

		expect(call.length).toBe(providedArgs.length);

		call.forEach((arg, j) => {
			expect(providedArgs[j]).toBe(arg);
		});
	});
}

export function expectCallbackArgsToEqual(cb, setup, ...calls) {
	const callback = jest.fn(cb);

	setup(callback);

	expect(callback.mock.calls.length).toBe(calls.length);

	calls.forEach((call, i) => {
		const providedArgs = callback.mock.calls[i];

		expect(call.length).toBe(providedArgs.length);

		call.forEach((arg, j) => {
			expect(providedArgs[j]).toEqual(arg);
		});
	});
}
