import { Observer, PushOperation } from "@undercut/types";

import { assert, assertPipeline, assertSource } from "@undercut/utils/assert";
import { abort, close, isObserver, isFunction } from "@undercut/utils";

import { toArray, toValue } from "./push_targets";

const operationErrorMessage = `An operation must be a function taking and returning an Observer.`;

function connectPipeline<T, P = T>(pipeline: Iterable<PushOperation<any>>, target: Observer<T>): Observer<P> {
	assertPipeline(pipeline);
	assert(isObserver(target), `"target" is required and must be an Observer.`);

	const operations = Array.isArray(pipeline) ? pipeline : [...pipeline];

	let observer: any = target;

	for (let index = operations.length - 1; index >= 0; index--) {
		const operation = operations[index];

		assert(isFunction(operation), operationErrorMessage);

		observer = operation(observer);

		assert(isObserver(observer), operationErrorMessage);
	}

	return observer;
}

export function composeOperations<P>(operations: Iterable<PushOperation<any>> | (() => Iterable<PushOperation<any>>)): PushOperation<P> {
	return <T>(observer: Observer<T>): Observer<P> =>
		connectPipeline(isFunction(operations) ? operations() : operations, observer);
}

export function pushLine<T, P = T>(pipeline: Iterable<PushOperation<any>>, target: Observer<T>): Observer<P> {
	return connectPipeline(pipeline, target);
}

export function push<T, R extends Observer<T> = Observer<T>, S = T>(target: R, pipeline: Iterable<PushOperation<any>>, source: Iterable<S>): R {
	assertSource(source);

	const observer = pushLine<T, S>(pipeline, target);

	try {
		for (const item of source) {
			observer.next(item as any);
		}
	} catch (error) {
		abort(observer, error);
	} finally {
		close(observer);
	}

	return target;
}

export function pushArray<S, P = S>(pipeline: Iterable<PushOperation<any>>, source: Iterable<S>): P[] {
	return push(toArray<P>(), pipeline, source).values;
}

export function pushValue<S, P = S>(pipeline: Iterable<PushOperation<any>>, source: Iterable<S>): P | undefined {
	return push(toValue<P>(), pipeline, source).value;
}
