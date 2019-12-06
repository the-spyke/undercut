import { assert, assertSources } from "../../utils/assert.js";
import { abort, asObserver, close, Cohort } from "../../utils/coroutine.js";
import { identity } from "../../utils/function.js";
import { getIterator } from "../../utils/iterable.js";
import { isFunction } from "../../utils/language.js";

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
		const cohort = Cohort.from(observer);
		const iterators = [];

		let index = 0;

		try {
			for (const source of sources) {
				const iterator = getIterator(source);

				cohort.next(iterator);
				iterators.push(iterator);
			}

			while (true) {
				const item = yield;
				const values = getValues(iterators);

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
						const values = getValues(iterators);

						if (values[0]) {
							break;
						} else {
							observer.next(itemFactory(values, index));
						}

						index++;
					}
				}
			});
		}
	});
}

function getValues(iterators) {
	const values = Array(iterators.length + 1);

	values[0] = 1;

	for (let index = 0; index < iterators.length; index++) {
		const iterator = iterators[index];

		if (iterator) {
			const { value, done } = iterator.next();

			if (done) {
				close(iterator);

				iterators[index] = null;
				values[index + 1] = undefined;
			} else {
				values[index + 1] = value;
				values[0] = undefined;
			}
		} else {
			values[index + 1] = undefined;
		}
	}

	return values;
}
