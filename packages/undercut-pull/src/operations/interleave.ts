import type { PullOperation } from "@undercut/types";

import { close, Cohort, getIterator } from "@undercut/utils";

export function interleave<T>(...sources: Array<Iterable<T>>): PullOperation<T> {
	return function* (iterable) {
		const cohort = Cohort.of(getIterator(iterable));

		try {
			sources.forEach(source => cohort.next(getIterator(source)));

			const iterators = cohort.coroutines.slice() as Array<Iterator<T>>;

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
						yield value as T;

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
