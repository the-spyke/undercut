import { closeIterator, getIterator } from "../../utils/iterable.js";

export function interleave(...sources) {
	return function* (iterable) {
		const iterators = [];

		try {
			iterators.push(getIterator(iterable));
			sources.forEach(source => iterators.push(getIterator(source)));

			while (iterators.length > 0) {
				let holeStart = 0;
				let holeLength = 0;

				for (let index = 0; index < iterators.length; index++) {
					const iterator = iterators[index];
					const { value, done } = iterator.next();

					if (done) {
						closeIterator(iterator);

						holeLength++;
					} else {
						yield value;

						iterators[holeStart] = iterator; // eslint-disable-line require-atomic-updates
						holeStart++;
					}
				}

				iterators.length -= holeLength;
			}
		} finally {
			iterators.forEach(closeIterator);
		}
	};
}
