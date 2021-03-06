import { expect, jest } from "@jest/globals";

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

export function testOperation(simulate, operationFactory, { args, source, target, callbackPosition, callbackArgs }) {
	const { operation, spy } = getOperationSpy(operationFactory, args, callbackArgs, callbackPosition);
	const result = simulate(operation, source);

	if (spy) {
		expect(spy.mock.calls).toEqual(callbackArgs);
	} else {
		expect(result).toEqual(target);
	}
}

function callbackTester({ simulate }, operationFactory, { args, source, callbackPosition, callbackArgs }) {
	const { operation, spy } = getOperationSpy(operationFactory, args, callbackArgs, callbackPosition);

	simulate(operation, source);

	expect(spy.mock.calls).toEqual(callbackArgs);
}

callbackTester.specProps = [`callbackArgs`, `callbackPosition`];

function limitTester({ simulate, asLimitedOp }, operationFactory, { args = [], source, limit }) {
	const operation = operationFactory(...args);
	const limitedOperation = asLimitedOp(operation, limit);

	expect(() => simulate(limitedOperation, source)).not.toThrow();
}

limitTester.specProps = [`limit`];

function targetTester({ simulate }, operationFactory, { args = [], source, target }) {
	const operation = operationFactory(...args);
	const result = simulate(operation, source);

	expect(result).toEqual(target);
}

targetTester.specProps = [`target`];

const testers = [
	callbackTester,
	limitTester,
	targetTester,
];

function findTesterForSpec(testSpec) {
	if (!testSpec) throw new Error(`"testSpec" is required`);

	const tester = testers.find(t => t.specProps.some(p => p in testSpec));

	if (!tester) throw new Error(`Unknown tester for a test spec with props: ${Object.keys(testSpec)}`);

	const allowedProps = new Set([`args`, `source`, ...tester.specProps]);
	const invalidProps = Object.keys(testSpec).filter(p => !allowedProps.has(p));

	if (invalidProps.length) {
		const type = tester.name.replace(`Tester`, ``);

		throw new Error(
			`Excess props for ${type} tests. \n` +
			`Allowed props: ${[...allowedProps].join(`, `)} \n` +
			`Invalid props: ${invalidProps.join(`, `)}`);
	}

	return tester;
}

export function createBySpecFactory(helpers) {
	if (!helpers) throw new Error(`"helpers" is required`);

	return function createBySpec(/** @type {"pull" | "push"} */ type, operationFactory) {
		if (!(type in helpers)) throw new Error(`Unknown test type: ${type}`);
		if (!operationFactory) throw new Error(`"operationFactory" is required`);

		return function bySpec(testSpec) {
			const tester = findTesterForSpec(testSpec);

			tester(helpers[type], operationFactory, testSpec);
		};
	};
}
