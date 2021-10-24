import type { Mapper, PullOperation } from "@undercut/types";

import { assert, assertSources } from "@undercut/utils/assert";
import { close, Cohort, getIterator, identity, isFunction } from "@undercut/utils";

export function zip<T>(...sources: Array<Iterable<T>>): PullOperation<T, Array<T | undefined>> {
	return zipCore(identity, sources);
}

export function zipWith<T, R>(itemFactory: Mapper<Array<T | undefined>, R>, ...sources: Array<Iterable<T>>): PullOperation<T, R> {
	return zipCore(itemFactory, sources);
}

function zipCore<T, R>(itemFactory: Mapper<Array<T | undefined>, R>, sources: Array<Iterable<T>>): PullOperation<T, R> {
	assert(isFunction(itemFactory), `"itemFactory" is required, must be a function.`);
	assertSources(sources);

	return function* (iterable) {
		const cohort = Cohort.of(getIterator(iterable));

		try {
			sources.forEach(source => cohort.next(getIterator(source)));

			const iterators = cohort.coroutines.slice() as Array<Iterator<T> | null>;

			let index = 0;

			while (true) {
				let allDone = true;

				const values = iterators.map((iterator, index) => {
					if (!iterator) {
						return undefined;
					}

					const { value, done } = iterator.next();

					if (done) {
						iterators[index] = null;
						close(iterator);
					} else {
						allDone = false;
					}

					return value as T;
				});

				if (allDone) {
					break;
				}

				yield itemFactory(values, index);

				index++;
			}
		} finally {
			close(cohort);
		}
	};
}
