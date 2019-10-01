import { filterInPlace } from "../../utils/array.js";
import { getIterator, tryCloseIterator } from "../../utils/iterable.js";
import { tryCloseObserver } from "../../utils/observer.js";

export function interleave(...sources) {
	return function* (observer) {
		const iterators = [];
		const readIterator = iterator => {
			const { done, value } = iterator.next();

			if (done) {
				tryCloseIterator(iterator);
			} else {
				observer.next(value);
			}

			return !done;
		};

		let success = false;

		try {
			sources.forEach(source => iterators.push(getIterator(source)));
			success = true;

			while (true) {
				observer.next(yield);

				filterInPlace(iterators, readIterator);
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success) {
				while (iterators.length > 0) {
					filterInPlace(iterators, readIterator);
				}
			}

			iterators.forEach(tryCloseIterator);
			tryCloseObserver(observer);
		}
	};
}
