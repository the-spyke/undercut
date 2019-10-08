import { assert, assertSources } from "../../utils/assert.js";
import { identity } from "../../utils/function.js";
import { getIterator, tryCloseIterator } from "../../utils/iterable.js";
import { isFunction } from "../../utils/language.js";
import { tryCloseObserver } from "../../utils/observer.js";

export function zip(...sources) {
	return zipCore(identity, sources);
}

export function zipWith(itemFactory, ...sources) {
	return zipCore(itemFactory, sources);
}

function zipCore(itemFactory, sources) {
	assert(isFunction(itemFactory), `"itemFactory" is required, must be a function.`);
	assertSources(sources);

	return function* (observer) {
		const iterators = [];

		let success = false;
		let index = 0;

		try {
			sources.forEach(source => iterators.push(getIterator(source)));
			success = true;

			while (true) {
				const item = yield;
				const values = getValues(iterators);

				values[0] = item;

				observer.next(itemFactory(values, index));

				index++;
			}
		} catch (e) {
			success = false;
			observer.throw(e);
		} finally {
			if (success) {
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

			iterators.filter(Boolean).forEach(tryCloseIterator);
			tryCloseObserver(observer);
		}
	};
}

function getValues(iterators) {
	const values = Array(iterators.length + 1);

	values[0] = 1;

	for (let index = 0; index < iterators.length; index++) {
		const iterator = iterators[index];

		if (iterator) {
			const { value, done } = iterator.next();

			if (done) {
				tryCloseIterator(iterator);
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
