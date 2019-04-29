import { assertIsRequired, assertSources } from "../../utils/assertions.js";
import { identity } from "../../utils/function.js";
import { getIterator, tryCloseIterator } from "../../utils/iterable.js";
import { isFunction } from "../../utils/lang.js";

export function zip(...sources) {
	return zipCore(identity, sources);
}

export function zipWith(itemFactory, ...sources) {
	return zipCore(itemFactory, sources);
}

function zipCore(itemFactory, sources) {
	assertIsRequired(isFunction(itemFactory), "Item Factory");
	assertSources(sources);

	return function* (iterable) {
		const iters = [];

		try {
			iters.push(getIterator(iterable));
			sources.forEach(source => iters.push(getIterator(source)));

			let index = 0;

			while (true) {
				let done = true;

				const values = iters.map(iter => {
					const item = iter.next();

					done = done && item.done;

					return item.value;
				});

				if (done) {
					break;
				}

				yield itemFactory(values, index);

				index++;
			}
		} finally {
			iters.forEach(tryCloseIterator);
		}
	};
}
