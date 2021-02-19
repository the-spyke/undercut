import type { PullOperation } from "@undercut/types";

import { assertSource } from "@undercut/utils/assert";

export function concatStart<T>(source: Iterable<T>): PullOperation<T> {
	assertSource(source);

	return function* (iterable) {
		yield* source;
		yield* iterable;
	};
}

export function concatEnd<T>(source: Iterable<T>): PullOperation<T> {
	assertSource(source);

	return function* (iterable) {
		yield* iterable;
		yield* source;
	};
}
