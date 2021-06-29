import type { Narrower, Observer, Predicate, PushOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { abort, asObserver, close } from "@undercut/utils";

function remove<T, R extends T>(predicate: Narrower<T, R>): PushOperation<T, Exclude<T, R>>;
function remove<T>(predicate: Predicate<T>): PushOperation<T>;
function remove<T, R extends T>(predicate: Narrower<T, R> | Predicate<T>): PushOperation<T, T | Exclude<T, R>> {
	assertFunctor(predicate, `predicate`);

	return asObserver(function* (observer: Observer<T | Exclude<T, R>>) {
		try {
			let index = 0;

			while (true) {
				const item: T = yield;

				if (!predicate(item, index)) {
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

export { remove };
