export function every(predicate) {
	return function* (iterable) {
		for (const item of iterable) {
			if (!predicate(item)) {
				yield false;

				return;
			}
		}

		yield true;
	};
}
