export function reducePull(predicate, initial) {
	return function* (iterable) {
		let acc = initial;
		for (const item of iterable) {
			acc = predicate(acc, item);
		}
		yield acc;
	};
}
