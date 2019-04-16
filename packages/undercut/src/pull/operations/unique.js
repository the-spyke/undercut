export function unique() {
	return function* (iterable) {
		const items = new Set();

		for (const item of iterable) {
			if (!items.has(item)) {
				items.add(item);

				yield item;
			}
		}
	};
}
