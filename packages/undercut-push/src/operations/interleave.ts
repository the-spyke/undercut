import type { Observer, PushOperation } from "@undercut/types";

import { filterInPlace } from "@undercut/utils/array";
import { abort, asObserver, close, Cohort, getIterator } from "@undercut/utils";

export function interleave<T>(...sources: Array<Iterable<T>>): PushOperation<T> {
	return asObserver(function* (observer: Observer<T>) {
		const cohort = Cohort.of(observer);
		const iterators: Iterator<T>[] = [];
		const readIterator = (iterator: Iterator<T>) => {
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
