export function reducePull(reducer, initial) {
	return function* (iterable) {
		let acc = initial;

		for (const item of iterable) {
			acc = reducer(acc, item);
		}

		yield acc;
	};
}
