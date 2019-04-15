import { assertSource } from "../../utils/assertions.js";

export function concatEnd(source) {
	assertSource(source);

	return function* (iterable) {
		yield* iterable;
		yield* source;
	};
}
