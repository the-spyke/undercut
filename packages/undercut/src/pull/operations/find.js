export function findPull(predicate) {
	return function* (iterable) {
		for (const item of iterable) {
			if (predicate(item)) {
				yield item;

				return;
			}
		}
	};
}
