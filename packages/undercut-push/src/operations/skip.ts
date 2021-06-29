import type { Observer, Predicate, PushOperation } from "@undercut/types";

import { assert, assertFunctor } from "@undercut/utils/assert";
import { abort, asObserver, close, isPositiveOrZero } from "@undercut/utils";

export function skip<T>(count: number): PushOperation<T> {
	assert(isPositiveOrZero(count), `"count" is required, must be a number >= 0.`);

	count = Math.trunc(count);

	return skipWhile((_: unknown, i: number) => i < count);
}

export function skipWhile<T>(predicate: Predicate<T>): PushOperation<T> {
	assertFunctor(predicate, `predicate`);

	return asObserver(function* (observer: Observer<T>) {
		try {
			let skip = true;
			let index = 0;

			while (true) {
				const item: T = yield;

				if (skip) {
					skip = predicate(item, index);
					index++;

					if (skip) {
						continue;
					}
				}

				observer.next(item);
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
