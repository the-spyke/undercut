export function union(...sources) {
	return function* (iterable) {
		const items = new Set();

		yield* scanSource(items, iterable);

		for (const source of sources) {
			yield* scanSource(items, source);
		}
	};
}

function* scanSource(items, source) {
	for (const item of source) {
		if (!items.has(item)) {
			items.add(item);

			yield item;
		}
	}
}
