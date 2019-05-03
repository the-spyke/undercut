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
					const result = iter.next();

					if (result.done) {
						tryCloseIterator(iter);
						itersToRemove.add(iter);
					} else {
						yield result.value;
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
