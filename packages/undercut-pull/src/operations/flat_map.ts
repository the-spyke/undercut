import type { PullOperation, RecMapper, RecPredicate } from "@undercut/types";

import { getRecursiveMapper } from "@undercut/utils";

export function flatMap<T, R>(predicate: RecPredicate<R, T>, mapper?: RecMapper<T, R>): PullOperation<T, R> {
	const recursiveMapper = getRecursiveMapper(predicate, mapper);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			const childItems = recursiveMapper(item, index);

			for (const childItem of childItems) {
				yield childItem;
			}

			index++;
		}
	};
}
