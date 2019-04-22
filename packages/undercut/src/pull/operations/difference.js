/**
 * Multisets are not supported.
 */
export function difference(...sources) {
	return function* (iterable) {
		const items = new Set();

		for (const source of sources) {
			scanToSet(items, source);
		}

		for (const item of iterable) {
			if (!items.has(item)) {
				yield item;
			}
		}
	};
}

/**
 * Multisets are not supported.
 */
export function symmetricDifference(...sources) {
	return function* (iterable) {
		const items = new Map();

		scanToMap(items, iterable);

		for (const source of sources) {
			scanToMap(items, source);
		}

		for (const item of items.keys()) {
			const count = items.get(item);

			if (count % 2 > 0) {
				yield item;
			}
		}
	};
}

function scanToSet(items, source) {
	for (const item of source) {
		if (!items.has(item)) {
			items.add(item);
		}
	}
}

function scanToMap(items, source) {
	for (const item of source) {
		const count = items.get(item);

		if (count === undefined) {
			items.set(item, 1);
		} else {
			items.set(item, count + 1);
		}
	}
}
