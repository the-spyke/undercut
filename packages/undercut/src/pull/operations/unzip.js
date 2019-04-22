import { assertIsRequired } from "../../utils/assertions.js";
import { identity } from "../../utils/function.js";
import { isFunction } from "../../utils/lang.js";

export function unzip() {
	return unzipWith(identity);
}

export function unzipWith(itemsExtractor) {
	assertIsRequired(isFunction(itemsExtractor), "Items Extractor");

	return function* (iterable) {
		const results = [];

		let index = 0;

		for (const item of iterable) {
			const values = itemsExtractor(item, index);

			if (results.length === 0) {
				values.forEach(() => results.push([]));
			} else if (results.length !== values.length) {
				throw new Error(`Items Extractor returns variable length arrays: was ${results.length}, now ${values.length}`);
			}

			values.forEach((v, i) => results[i].push(v));

			index++;
		}

		yield* results;
	};
}
