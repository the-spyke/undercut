import { Action, Observer } from "@undercut/types";

import { assert, assertFunctor } from "@undercut/utils/assert";
import { asObserver, isFunction, isUndefined, noop, rethrow } from "@undercut/utils";

export function toArray<T = unknown>() {
	return {
		next(value: T) {
			this.values.push(value);
		},
		return: noop,
		throw: rethrow,
		values: [] as T[],
	};
}

const consumerTarget = asObserver(function* (consumer, finalizer) {
	let error = undefined;
	let index = 0;

	try {
		while (true) {
			consumer(yield, index);
			index++;
		}
	} catch (e) {
		error = e;
		throw e;
	} finally {
		if (finalizer) {
			finalizer(error, index);
		}
	}
});

export function toConsumer<T = unknown>(consumer: Action<T>, finalizer?: (error: Error, index: number) => void): Observer<T> {
	assertFunctor(consumer, `consumer`);
	assert(isUndefined(finalizer) || isFunction(finalizer), `"finalizer" is optional, could be a function.`);

	return consumerTarget(consumer, finalizer);
}

export function toNull(): Observer<any> {
	return {
		next: noop,
		return: noop,
		throw: rethrow,
	};
}

export function toValue<T = unknown>() {
	return {
		next(value: T) {
			if (!this.hasValue) {
				this.value = value;
				this.hasValue = true;
			}
		},
		return: noop,
		throw: rethrow,
		value: undefined as T | undefined,
		hasValue: false,
	};
}
