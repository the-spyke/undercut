import { assertSelector } from "../../utils/assertions.js";

export function groupBy(keySelector) {
	assertSelector(keySelector);

	return function* (iterable) {
		const groups = new Map();

		for (const item of iterable) {
			const key = keySelector(item);

			let groupItems = groups.get(key);

			if (!groupItems) {
				groupItems = [];
				groups.set(key, groupItems);
			}

			groupItems.push(item);
		}

		yield* groups;
	};
}
