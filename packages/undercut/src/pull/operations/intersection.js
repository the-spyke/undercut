/**
 * Multisets are not supported.
 */
export function intersection(...sources) {
	return function* (iterable) {
		if (sources.length === 0) {
			return;
		}

		const items = new Map();

		for (const item of sources[0]) {
			items.set(item, 1);
		}

		for (let i = 1; i < sources.length; i++) {
			const source = sources[i];
			const nextCount = i + 1;

			for (const item of source) {
				const count = items.get(item);

				if (count === i) {
					items.set(item, nextCount);
				}
			}
		}

		const expectedCount = sources.length;

		for (const item of iterable) {
			const count = items.get(item);

			if (count === expectedCount) {
				items.delete(item);

				yield item;
			}
		}
	};
}
