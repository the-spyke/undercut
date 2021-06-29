import type { Observer, Predicate, PushOperation } from "@undercut/types";

import { assert, assertFunctor } from "@undercut/utils/assert";
import { abort, asObserver, close, isPositiveOrZero } from "@undercut/utils";

export function take<T>(count: number): PushOperation<T> {
	assert(isPositiveOrZero(count), `"count" is required, must be a number >= 0.`);

	count = Math.trunc(count);

	return asObserver(function* (observer: Observer<T>) {
		try {
			if (!count) {
				return;
			}

			let index = 0;

			while (true) {
				observer.next(yield);
				index++;

				if (index >= count) {
					return;
				}
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}

export function takeWhile<T>(predicate: Predicate<T>): PushOperation<T> {
	assertFunctor(predicate, `predicate`);

	return asObserver(function* (observer: Observer<T>) {
		try {
			let index = 0;

			while (true) {
				const item: T = yield;

				if (!predicate(item, index)) {
					return;
				}

				observer.next(item);
				index++;
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
