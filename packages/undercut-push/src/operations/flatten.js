import { assert, assertFunctor } from "@undercut/utils/src/assert.js";
import { abort, asObserver, close } from "@undercut/utils/src/coroutine.js";
import { identity } from "@undercut/utils/src/function.js";
import { getRecursiveMapper } from "@undercut/utils/src/iterable.js";
import { isPositiveOrZero } from "@undercut/utils/src/language.js";

export function flatten(predicate, depth = 1) {
	assert(isPositiveOrZero(depth), `"depth" is required, must be a number >= 0.`);

	depth = Math.trunc(depth);

	if (depth < 1) {
		return identity;
	}

	if (depth < 2) {
		return flatten1(predicate);
	}

	return flatMap((item, index, itemDepth) => itemDepth < depth && predicate(item, index, itemDepth));
}

export function flattenArrays(depth = 1) {
	return flatten(Array.isArray, depth);
}

export function flatMap(predicate, mapper) {
	const recursiveMapper = getRecursiveMapper(predicate, mapper);

	return asObserver(function* (observer) {
		try {
			let index = 0;

			while (true) {
				const iterable = recursiveMapper(yield, index);

				for (const item of iterable) {
					observer.next(item);
				}

				index++;
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}

function flatten1(predicate) {
	assertFunctor(predicate, `predicate`);

	return asObserver(function* (observer) {
		try {
			let index = 0;

			while (true) {
				const item = yield;

				if (predicate(item, index, 0)) {
					for (const childItem of item) {
						observer.next(childItem);
					}
				} else {
					observer.next(item);
				}

				index++;
			}
		} catch (error) {
			abort(observer, error);
		} finally {
			close(observer);
		}
	});
}
