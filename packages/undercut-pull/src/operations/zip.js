import { assert, assertSources } from "@undercut/utils/src/assert.js";
import { close, Cohort } from "@undercut/utils/src/coroutine.js";
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

	return function* (iterable) {
		const cohort = Cohort.of(getIterator(iterable));

		try {
			sources.forEach(source => cohort.next(getIterator(source)));

			const iterators = cohort.coroutines.slice();

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

					return value;
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
