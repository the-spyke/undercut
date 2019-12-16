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
	const observer = operation(getArrayObserver(result));

	try {
		source.forEach(item => observer.next(item));
	} catch (error) {
		observer.throw(error);
	} finally {
		observer.return();
	}

	return result;
}

function getOperationSpy(operationFactory, factoryArgs = null, callbackArgs = null, callbackPosition = 0) {
	if (!Array.isArray(factoryArgs)) {
		return { operation: operationFactory() };
	}

	if (!Array.isArray(callbackArgs)) {
		return { operation: operationFactory(...factoryArgs) };
	}

	const args = [...factoryArgs];
	const spy = jest.fn(args[callbackPosition]);

	args[callbackPosition] = spy;

	return { operation: operationFactory(...args), spy };
}

function testOperation(executor, operationFactory, { args, source, target, callbackPosition, callbackArgs }) {
	const { operation, spy } = getOperationSpy(operationFactory, args, callbackArgs, callbackPosition);

	expect(executor(operation, source)).toEqual(target);

	if (spy) {
		expect(spy.mock.calls).toEqual(callbackArgs);
	}
}

export const testOperationPull = testOperation.bind(undefined, testPull);
export const testOperationPush = testOperation.bind(undefined, testPush);

function getArrayObserver(array) {
	return {
		next(value) {
			array.push(value);
		},
		return() {
			// Empty.
		},
		throw(error) {
			throw error;
		},
	};
}
