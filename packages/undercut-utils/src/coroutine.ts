import type { Coroutine, Observer } from "@undercut/types";

import { assert } from "./assert";
import { getDoneItem, rethrow } from "./function";
import { isFunction } from "./language";

export function abort<I, O>(coroutine: Coroutine<I, O>, error: Error): never {
	if (isFunction(coroutine.throw)) {
		coroutine.throw(error);
	}

	throw error;
}

export function asObserver<T, A = unknown>(generator: (...args: Array<A>) => Iterator<T>) {
	return function (...args: Array<A>): Observer<T> {
		const observer = generator(...args);

		observer.next();

		return observer as Observer<T>;
	};
}

export function asUnclosable<I, O>(coroutine: Coroutine<I, O>): Coroutine<I, O> {
	return {
		next: coroutine.next.bind(coroutine),
		return: getDoneItem,
		throw: rethrow,
		[Symbol.iterator]() {
			return this;
		},
	} as Coroutine<I, O>;
}

export function close<I, O, R>(coroutine: Coroutine<I, O>, tryBeforeClosing?: (coroutine: Coroutine<I, O>) => R): R | undefined {
	assert(coroutine, `"coroutine" is required.`);

	try {
		if (tryBeforeClosing) {
			return tryBeforeClosing(coroutine);
		}
	} catch (error) {
		abort(coroutine, error);
	} finally {
		if (isFunction(coroutine.return)) {
			coroutine.return();
		}
	}

	return undefined;
}

export class Cohort implements Observer<Coroutine> {
	static from(coroutines: Array<Coroutine>): Cohort {
		return new Cohort(coroutines);
	}

	static of(...coroutines: Array<Coroutine>): Cohort {
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

	get hasErrors(): boolean {
		return !this.errors.length;
	}

	get isFine(): boolean {
		return !this.isClosed && !this.errors.length;
	}

	get length(): number {
		return this.coroutines.length;
	}

	[Symbol.iterator](): Iterator<Coroutine, void, void> {
		return this.coroutines.values();
	}

	next(coroutine: Coroutine) {
		assert(!this.isClosed, `Trying to add a coroutine to a closed trap.`);

		this.coroutines.push(coroutine);

		return { value: undefined, done: false };
	}

	return() {
		const result = { value: undefined, done: true };

		if (this.isClosed) {
			return result;
		}

		this.$close();

		return result;
	}

	throw(error: Error): never {
		if (this.isClosed) {
			throw error;
		}

		this.errors.push(error);
		this.$close();

		throw error;
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
