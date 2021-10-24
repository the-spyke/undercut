import type { Mapper, PushOperation } from "@undercut/types";

import { assert, assertSources } from "@undercut/utils/assert";
import { abort, close, Cohort, getIterator, identity, isFunction } from "@undercut/utils";

import { asPushOperation } from "../push_core";

export function zip<T>(...sources: Iterable<T>[]): PushOperation<T, Array<T | undefined>> {
	return zipCore(identity, sources);
}

export function zipWith<T, R>(itemFactory: Mapper<Array<T | undefined>, R>, ...sources: Iterable<T>[]): PushOperation<T, R> {
	return zipCore(itemFactory, sources);
}

function zipCore<T, R>(itemFactory: Mapper<Array<T | undefined>, R>, sources: Iterable<T>[]): PushOperation<T, R> {
	assert(isFunction(itemFactory), `"itemFactory" is required, must be a function.`);
	assertSources(sources);

	return asPushOperation<T, R>(function* (observer) {
		const cohort = Cohort.of(observer);

		let index = 0;
		let iterators: Array<Iterator<T> | null> = [];

		try {
			sources.forEach(source => cohort.next(getIterator(source)));

			iterators = cohort.coroutines.slice() as Iterator<T>[];
			iterators[0] = null;

			while (true) {
				const item: T = yield;
				const values = iterators.map((iterator, index): T | undefined => {
					if (!iterator) {
						return undefined;
					}

					const { value, done } = iterator.next();

					if (done) {
						iterators[index] = null;
						close(iterator);
					}

					return value;
				});

				values[0] = item;

				observer.next(itemFactory(values, index));

				index++;
			}
		} catch (error) {
			abort(cohort, error);
		} finally {
			close(cohort, () => {
				if (cohort.isFine) {
					while (true) { // eslint-disable-line no-constant-condition
						let allDone = true;

						const values = iterators.map((iterator, index): T | undefined => {
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

							return value;
						});

						if (allDone) {
							break;
						}

						observer.next(itemFactory(values, index));

						index++;
					}
				}
			});
		}
	});
}
