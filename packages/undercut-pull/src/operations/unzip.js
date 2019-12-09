import { assert } from "@undercut/utils/src/assert.js";
import { identity } from "@undercut/utils/src/function.js";
import { isFunction } from "@undercut/utils/src/language.js";

export function unzip() {
	return unzipWith(identity);
}

export function unzipWith(itemsExtractor) {
	assert(isFunction(itemsExtractor), `"itemsExtractor" is required, must be a function.`);

	return function* (iterable) {
		const results = [];

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
