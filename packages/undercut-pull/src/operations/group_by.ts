import type { Mapper, PullOperation } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";

export function groupBy<T, K>(keySelector: Mapper<T, K>): PullOperation<T, [K, T[]]> {
	assertFunctor(keySelector, `keySelector`);

	return function* (iterable) {
		const groups = new Map<K, Array<T>>();

		let index = 0;

		for (const item of iterable) {
			const key = keySelector(item, index);

			let groupItems = groups.get(key);

			if (!groupItems) {
				groupItems = [];
				groups.set(key, groupItems);
			}

			groupItems.push(item);

			index++;
		}

		yield* groups;
	};
}
