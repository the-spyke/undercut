import { close, Cohort } from "@undercut/utils/src/coroutine.js";
import { getIterator } from "@undercut/utils/src/iterable.js";

export function interleave(...sources) {
	return function* (iterable) {
		const cohort = Cohort.of(getIterator(iterable));

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
