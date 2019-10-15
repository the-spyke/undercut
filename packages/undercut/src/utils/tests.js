export function testPull(operation, source) {
	return [...operation(source)];
}

/**
 * @param {Generator} operation
 * @param {Iterable} source
 * @returns {Array}
 */
export function testPush(operation, source) {
	const result = [];
	const target = (function* (array) {
		while (true) array.push(yield);
	})(result);

	target.next();

	const observer = operation(target);

	try {
		observer.next();
		source.forEach(item => observer.next(item));
	} finally {
		observer.return();
	}

	return result;
}

function getOperationSpy(operation, operationArgs = null, callbackArgs = null, callbackPosition = 0) {
	if (!Array.isArray(operationArgs)) {
		return { op: operation() };
	}

	if (!Array.isArray(callbackArgs)) {
		return { op: operation(...operationArgs) };
	}

	const args = [...operationArgs];
	const spy = jest.fn(args[callbackPosition]);

	args[callbackPosition] = spy;

	return { op: operation(...args), spy };
}

function testOperation(executor, operation, { args, source, target, callbackPosition, callbackArgs }) {
	const { op, spy } = getOperationSpy(operation, args, callbackArgs, callbackPosition);

	expect(executor(op, source)).toEqual(target);

	if (spy) {
		expect(spy.mock.calls).toEqual(callbackArgs);
	}
}

export const testOperationPull = testOperation.bind(undefined, testPull);
export const testOperationPush = testOperation.bind(undefined, testPush);
