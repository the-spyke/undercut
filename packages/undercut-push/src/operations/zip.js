import { assert, assertSources } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close, Cohort } from "@undercut/utils/src/coroutine.js";
import { identity } from "@undercut/utils/src/function.js";
import { getIterator } from "@undercut/utils/src/iterable.js";
import { isFunction } from "@undercut/utils/src/language.js";

export function zip(...sources) {
	return zipCore(identity, sources);
}

export function zipWith(itemFactory, ...sources) {
	return zipCore(itemFactory, sources);
}

function zipCore(itemFactory, sources) {
	assert(isFunction(itemFactory), `"itemFactory" is required, must be a function.`);
	assertSources(sources);

	return asObserver(function* (observer) {
		const cohort = Cohort.of(observer);

		let index = 0;
		let iterators = [];

		try {
			sources.forEach(source => cohort.next(getIterator(source)));

			iterators = cohort.coroutines.slice();
			iterators[0] = null;

			while (true) {
				const item = yield;
				const values = iterators.map((iterator, index) => {
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
