export function callbackArgsOf(cb, setup) {
	const callback = jest.fn(cb);

	setup(callback);

	return callback.mock.calls;
}

export function targetOf(operation, source) {
	return [...operation(source)];
}

export function targetOfPull(operation, source) {
	return [...operation(source)];
}

export function targetOfPush(operation, source) {
	const result = [];
	const target = (function* (array) {
		while (true) array.push(yield);
	})(result);

	target.next();

	const pushline = operation(target);

	try {
		pushline.next();
		source.forEach(item => pushline.next(item));
	} finally {
		pushline.return();
	}

	return result;
}

export function mockOperationPull(callback) {
	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			callback && callback(item, index);

			yield item;

			index++;
		}
	};
}

// function getOperationArgs(operationArgs, callbackArgs, callbackPosition = 0) {
// 	if (Array.isArray(operationArgs) && Array.isArray(callbackArgs)) {
// 		const args = [...operationArgs];
// 		const spy = jest.fn(args[callbackPosition]);

// 		args[callbackPosition] = spy;

// 		return { args, spy };
// 	}

// 	return { args: operationArgs };
// }

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


// export function testOperation(executor, operation, operationArgs, source, target, { callbackPosition, callbackArgs } = {}) {
// 	const { args, spy } = getOperationArgs(operationArgs, callbackArgs, callbackPosition);

// 	const op = args ? operation(...args) : operation();

// 	expect(executor(op, source)).toEqual(target);

// 	if (spy) {
// 		expect(spy.mock.calls).toEqual(callbackArgs);
// 	}
// }

function testOperation(executor, operation, { args, source, target, callbackPosition, callbackArgs }) {
	const { op, spy } = getOperationSpy(operation, args, callbackArgs, callbackPosition);

	expect(executor(op, source)).toEqual(target);

	if (spy) {
		expect(spy.mock.calls).toEqual(callbackArgs);
	}
}

export const testOperationPull = testOperation.bind(undefined, targetOfPull);
export const testOperationPush = testOperation.bind(undefined, targetOfPush);

// function testOperationBatch(executor, operation, batch) {
// 	let index = 0;

// 	try {
// 		for (const { args: caseArgs, source, target, callbackArgs, callbackPosition } of batch.data) {
// 			if (callbackArgs) {
// 				testOperation(executor, operation, caseArgs === undefined ? batch.args : caseArgs, source, target, {
// 					callbackPosition,
// 					callbackArgs
// 				});
// 			} else {
// 				testOperation(executor, operation, caseArgs === undefined ? batch.args : caseArgs, source, target);
// 			}

// 			index++;
// 		}
// 	} catch (e) {
// 		console.error(`Error in batch item #${index}`);
// 		throw e;
// 	}
// }

// export function testOperationBatchPull(operation, batch) {
// 	return testOperationBatch(targetOf, operation, batch);
// }

// export function testOperationBatchPush(operation, batch) {
// 	return testOperationBatch(targetOfPush, operation, batch);
// }
