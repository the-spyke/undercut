import { getIterator, tryCloseIterator } from "../../utils/iterable.js";

export function interleave(...sources) {
	return function* (iterable) {
		let iters = [];

		try {
			let itersToRemove = new Set();
			let iterFilter = iter => !itersToRemove.has(iter);

			iters.push(getIterator(iterable));
			sources.forEach(source => iters.push(getIterator(source)));

			while (iters.length) {
				for (let i = 0; i < iters.length; i++) {
					const iter = iters[i];
					const item = iter.next();

					if (item.done) {
						tryCloseIterator(iter);
						itersToRemove.add(iter);
					} else {
						yield item.value;
					}
				}

				if (itersToRemove.size > 0) {
					iters = iters.filter(iterFilter);
					itersToRemove.clear();
				}
			}
		} finally {
			iters.forEach(tryCloseIterator);
		}
	};
}
