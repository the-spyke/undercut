import type { PullOperation } from "@undercut/types";

import { assertSource } from "@undercut/utils/assert";

export function concatStart<T, R = T>(source: Iterable<R>): PullOperation<T, T | R> {
	assertSource(source);

	return function* (iterable) {
		yield* source;
		yield* iterable;
	};
}

export function concatEnd<T, R = T>(source: Iterable<R>): PullOperation<T, T | R> {
	assertSource(source);

	return function* (iterable) {
		yield* iterable;
		yield* source;
	};
}
