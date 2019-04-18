import { assertSource } from "../../utils/assertions.js";

export function concatStart(source) {
	assertSource(source);

	return function* (iterable) {
		yield* source;
		yield* iterable;
	};
}

export function concatEnd(source) {
	assertSource(source);

	return function* (iterable) {
		yield* iterable;
		yield* source;
	};
}
