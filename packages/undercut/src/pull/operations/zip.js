import { assertIsRequired } from "../../utils/assertions.js";
import { identity } from "../../utils/function.js";
import { isFunction } from "../../utils/lang.js";

export function zip(...sources) {
	return zipCore(identity, sources);
}

export function zipWith(itemFactory, ...sources) {
	return zipCore(itemFactory, sources);
}

function zipCore(itemFactory, sources) {
	assertIsRequired(isFunction(itemFactory), "Item Factory");

	return function* (iterable) {
		const iters = [iterable[Symbol.iterator]()];

		sources.forEach(source => iters.push(source[Symbol.iterator]()));

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

			yield itemFactory(values);
		}
	};
}
