import type { PullOperation, PushOperation } from "@undercut/types";

import { expect, jest } from "@jest/globals";

export type SomeOperation<T, R> = PullOperation<T, R> | PushOperation<T, R>;

export type OperationFactory<T = any, R = T> = (...args: Array<any>) => SomeOperation<T, R>;

export type Simulate<T = any, R = T> = (op: SomeOperation<T, R>, source: Iterable<T>) => Array<R>;

export interface TestOperationOptions {
	args?: Array<any>,
	source: any,
	target: any,
	callbackPosition?: number,
	callbackArgs?: Array<any>,
}

function getOperationSpy(
	operationFactory: OperationFactory,
	factoryArgs?: Array<any>,
	callbackArgs?: Array<any>,
	callbackPosition = 0
) {
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

export function testOperation(
	simulate: Simulate,
	operationFactory: OperationFactory,
	{ args, source, target, callbackPosition, callbackArgs }: TestOperationOptions
) {
	const { operation, spy } = getOperationSpy(operationFactory, args, callbackArgs, callbackPosition);
	const result = simulate(operation, source);

	if (spy) {
		expect(spy.mock.calls).toEqual(callbackArgs);
	} else {
		expect(result).toEqual(target);
	}
}

export interface CallbackTesterOptions {
	args: Array<any>,
	source: any,
	callbackPosition?: number,
	callbackArgs: Array<any>,
}

function callbackTester(
	{ simulate }: { simulate: Simulate; },
	operationFactory: OperationFactory,
	{ args, source, callbackPosition, callbackArgs }: CallbackTesterOptions
) {
	const { operation, spy } = getOperationSpy(operationFactory, args, callbackArgs, callbackPosition);

	simulate(operation, source);

	expect((spy as any).mock.calls).toEqual(callbackArgs);
}

callbackTester.specProps = [`callbackArgs`, `callbackPosition`];

export interface LimitTesterOptions {
	args?: Array<any>,
	source: any,
	limit: any,
}

function limitTester(
	{ simulate, asLimitedOp }: { simulate: Simulate, asLimitedOp: <T, R>(operation: SomeOperation<T, R>, limit: any) => SomeOperation<T, R>; },
	operationFactory: OperationFactory,
	{ args = [], source, limit }: LimitTesterOptions
) {
	const operation = operationFactory(...args);
	const limitedOperation = asLimitedOp(operation, limit);

	expect(() => simulate(limitedOperation, source)).not.toThrow();
}

limitTester.specProps = [`limit`];

export interface TargetTesterOptions {
	args?: Array<any>,
	source: any,
	target: any,
}

function targetTester(
	{ simulate }: { simulate: Simulate; },
	operationFactory: OperationFactory,
	{ args = [], source, target }: TargetTesterOptions
) {
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

export type TesterSpec = CallbackTesterOptions | LimitTesterOptions | TargetTesterOptions;

function findTesterForSpec(testSpec: TesterSpec): Function {
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

export function createBySpecFactory(helpers: { pull: any, push: any; }) {
	if (!helpers) throw new Error(`"helpers" is required`);

	return function createBySpec(type: `pull` | `push`, operationFactory: Function) {
		if (!(type in helpers)) throw new Error(`Unknown test type: ${type}`);
		if (!operationFactory) throw new Error(`"operationFactory" is required`);

		return function bySpec(testSpec: TesterSpec) {
			const tester = findTesterForSpec(testSpec);

			tester(helpers[type], operationFactory, testSpec);
		};
	};
}
