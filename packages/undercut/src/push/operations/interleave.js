import { filterInPlace } from "../../utils/array.js";
import { abort, asObserver, close, Cohort } from "../../utils/coroutine.js";
import { getIterator } from "../../utils/iterable.js";

export function interleave(...sources) {
	return asObserver(function* (observer) {
		const cohort = Cohort.from(observer);
		const iterators = [];
		const readIterator = iterator => {
			const { value, done } = iterator.next();

			if (done) {
				close(iterator);
			} else {
				observer.next(value);
			}

			return !done;
		};

		try {
			for (const source of sources) {
				const iterator = getIterator(source);

				cohort.next(iterator);
				iterators.push(iterator);
			}

			while (true) {
				observer.next(yield);

				filterInPlace(iterators, readIterator);
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					while (iterators.length > 0) {
						filterInPlace(iterators, readIterator);
					}
				}
			});
		}
	});
}
