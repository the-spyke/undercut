import { assertReducer } from "../../utils/assertions.js";

export function reduce(reducer, initial) {
	assertReducer(reducer);

	return function* (iterable) {
		let acc = initial;

		for (const item of iterable) {
			acc = reducer(acc, item);
		}

		yield acc;
	};
}
