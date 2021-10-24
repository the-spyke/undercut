import type { PullOperation, PullTarget } from "@undercut/types";

import { assert, assertPipeline, assertSource } from "@undercut/utils/assert";
import { createIterable, getIterator, head, isFunction, isIterable, isIterator } from "@undercut/utils";

const operationErrorMessage = `An operation must be a function taking and returning an Iterable.`;

function connectPipeline<R>(pipeline: Iterable<PullOperation<any>>, source: Iterable<any>): Iterable<R> {
	assertPipeline(pipeline);
	assertSource(source);

	let iterable = source;

	for (const operation of pipeline) {
		assert(isFunction(operation), operationErrorMessage);

		iterable = operation(iterable);

		assert(isIterable(iterable), operationErrorMessage);
	}

	return iterable as Iterable<R>;
}

export function composeOperations<R>(operations: Iterable<PullOperation<any>> | (() => Iterable<PullOperation<any>>)): PullOperation<R> {
	return function (iterable) {
		return connectPipeline<R>(isFunction(operations) ? operations() : operations, iterable);
	};
}

export function pullLine<S, P = S>(pipeline: Iterable<PullOperation<any>>, source: Iterable<S>): Iterable<P> {
	assertPipeline(pipeline);
	assertSource(source);

	return createIterable(() => {
		const iteratable = connectPipeline<P>(pipeline, source);

		if (isIterator(iteratable)) {
			return iteratable as Iterator<P>;
		}

		return getIterator(iteratable);
	});
}

export function pull<S, P = S, T = S>(target: PullTarget<P, T>, pipeline: Iterable<PullOperation<any>>, source: Iterable<S>): T {
	assert(isFunction(target), `"target" is required, must be a function accepting an iterable.`);

	return target(connectPipeline(pipeline, source));
}

export function pullArray<S, P = S>(pipeline: Iterable<PullOperation<any>>, source: Iterable<S>): Array<P> {
	return pull(Array.from as PullTarget<S, Array<P>>, pipeline, source);
}

export function pullValue<S, P = S>(pipeline: Iterable<PullOperation<any>>, source: Iterable<S>): P | undefined {
	return pull<S, P, P | undefined>(head, pipeline, source);
}
