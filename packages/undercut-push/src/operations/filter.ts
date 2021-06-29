import type { Narrower, Observer, Predicate, PushOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { abort, asObserver, close } from "@undercut/utils";

function filter<T, R extends T>(predicate: Narrower<T, R>): PushOperation<T, R>;
function filter<T>(predicate: Predicate<T>): PushOperation<T>;
function filter<T, R extends T>(predicate: Narrower<T, R> | Predicate<T>): PushOperation<T, R> {
	assertFunctor(predicate, `predicate`);

	return asObserver(function* (observer: Observer<R>) {
		try {
			let index = 0;

			while (true) {
				const item: T = yield;

				if (predicate(item, index)) {
					observer.next(item);
				}

				index++;
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}

export { filter };
