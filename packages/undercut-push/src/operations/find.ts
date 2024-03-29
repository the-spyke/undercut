import type { Predicate, PushOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";
import { abort, close } from "@undercut/utils";

import { asPushOperation } from "../push_core";

function findCore<T>(predicate: Predicate<T>, isIndex: true): PushOperation<T, number>;
function findCore<T>(predicate: Predicate<T>, isIndex: false): PushOperation<T, T>;
function findCore<T>(predicate: Predicate<T>, isIndex: boolean): PushOperation<T, T | number> {
	assertFunctor(predicate, `predicate`);

	return asPushOperation<T, T | number>(function* (observer) {
		try {
			let index = 0;

			while (true) {
				const item: T = yield;

				if (predicate(item, index)) {
					observer.next(isIndex ? index : item);

					return;
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

export function find<T>(predicate: Predicate<T>): PushOperation<T> {
	return findCore(predicate, false);
}

export function findIndex<T>(predicate: Predicate<T>): PushOperation<T, number> {
	return findCore(predicate, true);
}
