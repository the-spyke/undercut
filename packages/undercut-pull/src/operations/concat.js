import { assertSource } from "@undercut/utils/src/assert.js";

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
