import type { Action, Observer, PullTarget } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { abort, close, head, isObserver } from "@undercut/utils";

export function toArray<T>(): PullTarget<T, Array<T>> {
	return Array.from;
}

export function toConsumer<T>(consumer: Action<T>): PullTarget<T, void> {
	return function (iterable) {
		let index = 0;

		for (const item of iterable) {
			consumer(item, index);
			index++;
		}
	};
}

export function toMap<K = any, V = any, T extends [K, V] = [K, V]>(): PullTarget<T, Map<K, V>> {
	return function (iterable) {
		return new Map(iterable);
	};
}

export function toNull(): PullTarget<unknown, void> {
	return function (iterable) {
		for (const item of iterable) { // eslint-disable-line no-unused-vars
			// Do nothing.
		}
	};
}

export function toObject<T extends [PropertyKey, V], V = any, O extends { [k: string]: V } = Record<string, V>>(): PullTarget<T, O> {
	return Object.fromEntries;
}

export function toObserver<T>(observer: Observer<T>): PullTarget<T, Observer<T>> {
	assert(isObserver(observer), `"observer" is required and must be an Observable.`);

	return function (iterable) {
		try {
			for (const item of iterable) {
				observer.next(item);
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}

		return observer;
	};
}

export function toSet<T>(): PullTarget<T, Set<T>> {
	return function (iterable) {
		return new Set(iterable);
	};
}

export function toValue<T>(): PullTarget<T | undefined> {
	return head;
}
