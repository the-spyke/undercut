import { assert } from "./assert.js";
import { getDoneItem, rethrow } from "./function.js";
import { isFunction } from "./language.js";

/**
 * @param {Coroutine} coroutine
 * @param {Error} error
 * @returns {never}
 */
export function abort(coroutine, error) {
	if (isFunction(coroutine.throw)) {
		coroutine.throw(error);
	}

	throw error;
}

/**
 * @type {<T extends Function>(generator: T) => T}
*/
export function asObserver(generator) {
	return function (...args) {
		const genObject = generator(...args);

		genObject.next();

		return genObject;
	};
}

export function asUnclosable(coroutine) {
	return {
		next: coroutine.next.bind(coroutine),
		return: getDoneItem,
		throw: rethrow,
	};
}

/**
 * @type {<T, R>(coroutine: T, tryBeforeClosing?: (coroutine: T) => R) => R)}
 */
export function close(coroutine, tryBeforeClosing) {
	assert(coroutine, `"coroutine" is required.`);

	try {
		if (tryBeforeClosing) {
			return tryBeforeClosing(coroutine);
		}

		return undefined;
	} catch (error) {
		if (isFunction(coroutine.throw)) {
			coroutine.throw(error);
		}

		throw error;
	} finally {
		if (isFunction(coroutine.return)) {
			coroutine.return();
		}
	}
}

export class Cohort {
	static from(...coroutines) {
		return new Cohort(coroutines);
	}

	/**
	 * @param {Array<Coroutine>} coroutines
	 */
	constructor(coroutines) {
		assert(Array.isArray(coroutines), `"coroutines" is required and must be an array of coroutines.`);

		this.coroutines = coroutines;
		this.errors = [];
		this.isClosed = false;
	}

	get hasErrors() {
		return !this.errors.length;
	}

	get isFine() {
		return !this.isClosed && !this.errors.length;
	}

	get length() {
		return this.coroutines.length;
	}

	[Symbol.iterator]() {
		return this.coroutines.values();
	}

	next(coroutine) {
		assert(!this.isClosed, `Trying to add a coroutine to a closed trap.`);

		this.coroutines.push(coroutine);
	}

	return() {
		if (this.isClosed) {
			return;
		}

		this.$close();
	}

	throw(error) {
		if (this.isClosed) {
			throw error;
		}

		this.errors.push(error);
		this.$close();
	}

	$close() {
		const errors = this.errors;

		for (const coroutine of this.coroutines) {
			try {
				if (errors.length && isFunction(coroutine.throw)) {
					coroutine.throw(errors[0]);
				} else if (isFunction(coroutine.return)) {
					coroutine.return();
				}
			} catch (error) {
				if (!errors.length || error !== errors[0]) {
					errors.push(error);
				}
			}
		}

		this.isClosed = true;

		if (errors.length === 1) {
			throw errors[0];
		} else if (errors.length > 1) {
			const error = new Error(`Multiple errors.`);

			error.errors = errors;

			throw error;
		}
	}
}
