import type { Observer, PushOperation, Selector } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { abort, asObserver, close, Cohort, identity } from "@undercut/utils";

/**
 * Multisets are not supported.
 */
export const union: <T>(...sources: Iterable<T>[]) => PushOperation<T> = unionBy.bind(undefined, identity);

/**
 * Multisets are not supported.
 */
export function unionBy<T, K>(selector: Selector<T, K>, ...sources: Iterable<T>[]): PushOperation<T> {
	assertFunctor(selector, `selector`);

	return asObserver(function* (observer: Observer<T>) {
		const cohort = Cohort.of(observer);
		const keys = new Set<K>();

		try {
			while (true) {
				addPassItem(keys, observer, selector, yield);
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					for (const source of sources) {
						for (const item of source) {
							addPassItem(keys, observer, selector, item);
						}
					}
				}
			});
		}
	});
}

function addPassItem<T, K>(keys: Set<K>, observer: Observer<T>, selector: Selector<T, K>, item: T): void {
	const key = selector(item);

	if (!keys.has(key)) {
		keys.add(key);

		observer.next(item);
	}
}
