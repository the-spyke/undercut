export function includes(value) {
	return function* (iterable) {
		for (const item of iterable) {
			if (item === value) {
				yield true;

				return;
			}
		}

		yield false;
	};
}
