import { abort, asObserver, close } from "@undercut/utils/src/coroutine.js";
import { getRecursiveMapper } from "@undercut/utils/src/iterable.js";

export function flatMap(predicate, mapper) {
	const recursiveMapper = getRecursiveMapper(predicate, mapper);

	return asObserver(function* (observer) {
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
