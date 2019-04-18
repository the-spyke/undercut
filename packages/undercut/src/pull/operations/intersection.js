export function intersection(...sources) {
	return function* (iterable) {
		if (sources.length === 0) {
			return;
		}

		const items = new Map();

		for (const item of sources[0]) {
			if (!items.has(item)) {
				items.set(item, 1);
			}
		}

		for (let i = 1; i < sources.length; i++) {
			const source = sources[i];
			const nextIndex = i + 1;

			for (const item of source) {
				const index = items.get(item);

				if (index === i) {
					items.set(item, nextIndex);
				}
			}
		}

		for (const item of iterable) {
			const index = items.get(item);

			if (index === sources.length) {
				items.delete(item);

				yield item;
			}
		}
	};
}
