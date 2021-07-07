import type { AnyOperation } from "@undercut/types";

import { expect, jest } from "@jest/globals";

export type OperationType = `pull` | `push`;

export type OperationFactory<A extends unknown[], I, O> = (...args: A) => AnyOperation<I, O>;

function getOperationSpy(
	operationFactory: any,
	factoryArgs?: any,
	callbackArgs?: any,
	callbackPosition = 0,
) {
	if (!Array.isArray(factoryArgs)) {
		return { operation: operationFactory() };
	}

	if (!Array.isArray(callbackArgs)) {
		return { operation: operationFactory(...factoryArgs) };
	}

	const args = factoryArgs.slice();
	const spy = jest.fn(args[callbackPosition]);

	args[callbackPosition] = spy;

	return { operation: operationFactory(...args), spy };
}

export function testOperation(
	simulate: any,
	operationFactory: any,
	{ args, source, target, callbackPosition, callbackArgs }: any
) {
	const { operation, spy } = getOperationSpy(operationFactory, args, callbackArgs, callbackPosition);
	const result = simulate(operation, source);

	if (spy) {
		expect(spy.mock.calls).toEqual(callbackArgs);
	} else {
		expect(result).toEqual(target);
	}
}

type ExecuteAsArray<I, O> = (pipeline: [AnyOperation<I, O>], source: Iterable<I>) => O[];

interface TesterTools<I, O> {
	executeAsArray: ExecuteAsArray<I, O>,
	asLimitedOp: <OP extends AnyOperation<I, O>>(operation: OP, limit: number) => OP,
}

interface BaseTesterOptions<A extends unknown[], I> {
	args: A,
	source: Iterable<I>,
}

export interface CallbackTesterOptions<A extends unknown[], I, CA extends unknown[]> extends BaseTesterOptions<A, I> {
	callbackPosition?: number,
	callbackArgs: CA,
}

function callbackTester<A extends unknown[], I, CA extends unknown[]>(
	operationFactory: OperationFactory<A, I, unknown>,
	{ executeAsArray }: TesterTools<I, unknown>,
	{ args, source, callbackPosition = 0, callbackArgs }: CallbackTesterOptions<A, I, CA>
) {
	const spy = jest.fn<AnyOperation<I, unknown>, CA>(args[callbackPosition] as any);
	const customArgs = args.slice() as A;

	customArgs[callbackPosition] = spy;

	const operation = operationFactory(...customArgs);

	executeAsArray([operation], source);

	expect(spy.mock.calls).toEqual(callbackArgs);
}

callbackTester.specProps = [`callbackArgs`, `callbackPosition`];

export interface LimitTesterOptions<A extends unknown[], I> extends BaseTesterOptions<A, I> {
	limit: number,
}

function limitTester<A extends unknown[], I>(
	operationFactory: OperationFactory<A, I, unknown>,
	{ executeAsArray, asLimitedOp }: TesterTools<I, unknown>,
	{ args, source, limit }: LimitTesterOptions<Parameters<typeof operationFactory>, I>
) {
	const operation = operationFactory(...(args || []));
	const limitedOperation = asLimitedOp(operation, limit);

	expect(() => executeAsArray([limitedOperation], source)).not.toThrow();
}

limitTester.specProps = [`limit`];

export interface TargetTesterOptions<A extends unknown[], I, O extends unknown[]> extends BaseTesterOptions<A, I> {
	target: O,
}

function targetTester<A extends unknown[], I, O>(
	operationFactory: OperationFactory<A, I, O>,
	{ executeAsArray }: TesterTools<I, O>,
	{ args, source, target }: TargetTesterOptions<Parameters<typeof operationFactory>, I, O[]>
) {
	const operation = operationFactory(...(args || []));

	expect(executeAsArray([operation], source)).toEqual(target);
}

targetTester.specProps = [`target`];

const testers = [
	callbackTester,
	limitTester,
	targetTester,
];

function findTesterForSpec<A extends unknown[], I>(testSpec: BaseTesterOptions<A, I>) {
	if (!testSpec) throw new Error(`"testSpec" is required`);

	const matchedTesters = testers.filter(t => t.specProps.some(p => p in testSpec));

	if (!matchedTesters.length) throw new Error(`Unknown tester for a test spec with props: ${Object.keys(testSpec)}`);
	if (matchedTesters.length > 1) throw new Error(`Ambiguous test spec with several mathing testers. Its props: ${Object.keys(testSpec)}`);

	const tester = matchedTesters[0];
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

export interface SpecConfig<I, O> {
	type: OperationType;
	executeAsArray: ExecuteAsArray<I, O>;
}

export function createBySpecFactory(helpers: { pull: any, push: any; }) {
	if (!helpers) throw new Error(`"helpers" is required`);

	return function createBySpec<A extends unknown[], FI, FO>(
		executeAsArray: ExecuteAsArray<FI, FO>,
		operationFactory: OperationFactory<A, FI, FO>,
	) {
		// if (!(type in helpers)) throw new Error(`Unknown test type: ${type}`);
		if (!operationFactory) throw new Error(`"operationFactory" is required`);

		let type: OperationType;

		if (executeAsArray.name.startsWith(`pull`)) {
			type = `pull`;
		} else if (executeAsArray.name.startsWith(`push`)) {
			type = `push`;
		} else {
			throw new Error(`Can't get operation type from executor's name.`);
		}

		const tools = { executeAsArray, ...helpers[type] };

		function expectBySpec<I extends FI, O extends FO>(testSpec: TargetTesterOptions<A, I, O[]>): void;
		function expectBySpec<I extends FI, CA extends unknown[]>(testSpec: CallbackTesterOptions<A, I, CA>): void;
		function expectBySpec<I extends FI>(testSpec: LimitTesterOptions<A, I>): void;
		function expectBySpec(testSpec: any) {
			const tester: any = findTesterForSpec(testSpec);

			tester(operationFactory, tools, testSpec);
		}

		return expectBySpec;
	};
}
