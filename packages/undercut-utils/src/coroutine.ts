import { assert } from "./assert";
import { getDoneItem, rethrow } from "./function";
import { isFunction } from "./language";

type Coroutine = any;

export function abort(coroutine: Coroutine, error: Error): never {
	if (isFunction(coroutine.throw)) {
		coroutine.throw(error);
	}

	throw error;
}

export function asObserver(generator: GeneratorFunction) {
	return function (...args: Array<any>) {
		const observer = generator(...args);

		observer.next();

		return observer;
	};
}

export function asUnclosable(coroutine: Coroutine) {
	return {
		next: coroutine.next.bind(coroutine),
		return: getDoneItem,
		throw: rethrow,
	};
}

export function close<R>(coroutine: Coroutine, tryBeforeClosing?: (coroutine: Coroutine) => R): R | undefined {
	assert(coroutine, `"coroutine" is required.`);

	try {
		if (tryBeforeClosing) {
			return tryBeforeClosing(coroutine);
		}

		return undefined;
	} catch (error) {
		abort(coroutine, error);
	} finally {
		if (isFunction(coroutine.return)) {
			coroutine.return();
		}
	}
}

export class Cohort {
	static from(coroutines: Array<Coroutine>): Cohort {
		return new Cohort(coroutines);
	}

	static of(...coroutines: Array<Coroutine>) {
		return new Cohort(coroutines);
	}

	coroutines: Array<Coroutine>;
	errors: Array<Error>;
	isClosed: boolean;

	constructor(coroutines: Array<Coroutine>) {
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

	next(coroutine: Coroutine) {
		assert(!this.isClosed, `Trying to add a coroutine to a closed trap.`);

		this.coroutines.push(coroutine);
	}

	return() {
		if (this.isClosed) {
			return;
		}

		this.$close();
	}

	throw(error: Error) {
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
		}

		if (errors.length > 1) {
			throw new AggregateError(errors, `Multiple errors in a coroutine cohort.`);
		}
	}
}
