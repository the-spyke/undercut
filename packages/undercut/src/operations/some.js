export function somePull(predicate) {
	return function* (iterable) {
		for (const item of iterable) {
			if (predicate(item)) {
				yield true;

				return;
			}
		}

		yield false;
	};
}
