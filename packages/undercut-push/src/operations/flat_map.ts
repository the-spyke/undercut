import type { Observer, PushOperation, RecMapper, RecNarrower } from "@undercut/types";

import { abort, asObserver, close, getRecursiveMapper } from "@undercut/utils";

export function flatMap<T, R extends T = T>(predicate: RecNarrower<R>, mapper?: RecMapper<T, R>): PushOperation<T, R> {
	const recursiveMapper = getRecursiveMapper(predicate, mapper);

	return asObserver(function* (observer: Observer<R>) {
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
