import { close, Cohort } from "../../utils/coroutine.js";
import { getIterator } from "../../utils/iterable.js";

export function interleave(...sources) {
	return function* (iterable) {
		const cohort = Cohort.from(getIterator(iterable));

		try {
			sources.forEach(source => cohort.next(getIterator(source)));

			const iterators = cohort.coroutines.slice();

			while (iterators.length > 0) {
				let holeStart = 0;
				let holeLength = 0;

				for (let index = 0; index < iterators.length; index++) {
					const iterator = iterators[index];
					const { value, done } = iterator.next();

					if (done) {
						close(iterator);

						holeLength++;
					} else {
						yield value;

						iterators[holeStart] = iterator;
						holeStart++;
					}
				}

				iterators.length -= holeLength;
			}
		} finally {
			close(cohort);
		}
	};
}
