import type { PushOperation, RecMapper, RecNarrower } from "@undercut/types";

import { abort, close, getRecursiveMapper } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function flatMap<T, R extends T = T>(predicate: RecNarrower<R>, mapper?: RecMapper<T, R>): PushOperation<T, R> {
	const recursiveMapper = getRecursiveMapper(predicate, mapper);

	return asPushOperation<T, R>(function* (observer) {
		try {
			let index = 0;

			while (true) {
				const iterable = recursiveMapper(yield, index);

				for (const item of iterable) {
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
