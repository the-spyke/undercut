import type { Predicate, PushOperation } from "@undercut/types";

import { assert, assertFunctor } from "@undercut/utils/assert";
import { abort, close, isPositiveOrZero } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function take<T>(count: number): PushOperation<T> {
	assert(isPositiveOrZero(count), `"count" is required, must be a number >= 0.`);

	count = Math.trunc(count);

	return asPushOperation<T>(function* (observer) {
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

export function takeWhile<T>(predicate: Predicate<T>) {
	assertFunctor(predicate, `predicate`);

	return asPushOperation<T>(function* (observer) {
		try {
			let index = 0;

			while (true) {
				const item = yield;

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
