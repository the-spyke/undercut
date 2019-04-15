import { assertSource } from "../../utils/assertions.js";

export function concatStart(source) {
	assertSource(source);

	return function* (iterable) {
		yield* source;
		yield* iterable;
	};
}
