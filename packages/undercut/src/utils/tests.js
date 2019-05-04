export function callbackArgsOf(cb, setup) {
	const callback = jest.fn(cb);

	setup(callback);

	return callback.mock.calls;
}

export function lineTargetOf(pullLine) {
	return [...pullLine];
}

export function sourceItems(source) {
	return [...source];
}

export function targetOf(operation, source) {
	return [...operation(source)];
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
