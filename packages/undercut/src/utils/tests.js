export function targetOf(operation, source) {
	return [...operation(source)];
}

export function lineTargetOf(pullLine) {
	return [...pullLine];
}

export function sourceItems(source) {
	return [...source];
}

export function testOperation(callback) {
	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			callback && callback(item, index);

			yield item;

			index++;
		}
	};
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
