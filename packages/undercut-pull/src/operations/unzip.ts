import type { Mapper, PullOperation } from "@undercut/types";

import { assert } from "@undercut/utils/assert";
import { identity, isFunction } from "@undercut/utils";

export function unzip<T>(): PullOperation<Array<T>, Array<T>> {
	return unzipWith(identity);
}

export function unzipWith<T, R>(itemsExtractor: Mapper<T, Array<R>>): PullOperation<T, Array<R>> {
	assert(isFunction(itemsExtractor), `"itemsExtractor" is required, must be a function.`);

	return function* (iterable) {
		const results = [] as Array<Array<R>>;

		let index = 0;

		for (const item of iterable) {
			const values = itemsExtractor(item, index);

			if (results.length === 0) {
				values.forEach(() => results.push([]));
			} else if (results.length !== values.length) {
				throw new Error(`"itemsExtractor" returns variable length arrays: was ${results.length}, now ${values.length}`);
			}

			values.forEach((v, i) => results[i].push(v));

			index++;
		}

		yield* results;
	};
}
