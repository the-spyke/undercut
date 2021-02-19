import type { KeyGroup, PullOperation, Selector } from "@undercut/types";

import { assertFunctor } from "@undercut/utils/assert";

export function groupBy<T, K>(keySelector: Selector<T, K>): PullOperation<T, KeyGroup<K, T>> {
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
