import type { FullCoroutine, Observer, SimpleIterator, Coroutine } from "@undercut/types";

import { assert } from "./assert";
import { getDoneItem, rethrow } from "./function";
import { isFunction } from "./language";

export function abort(coroutine: Coroutine, error: Error): never {
	if (isFunction(coroutine.throw)) {
		coroutine.throw(error);
	}

	throw error;
}

type ObserverGenerator<T = any, A extends any[] = any[]> = (...args: A) => Observer<T>;
type ExtractObserverType<T> = T extends ObserverGenerator<infer X, any[]> ? X : never;

export function asObserver<Gen extends ObserverGenerator<T>, T = ExtractObserverType<Gen>>(generator: Gen) {
	return function (...args: Parameters<Gen>): Observer<T> {
		const observer = generator(...args);

		(observer as any).next();

		return observer;
	};
}

function asUnclosable<I>(coroutine: Observer<I>): Observer<I>;
function asUnclosable<O>(coroutine: SimpleIterator<O>): SimpleIterator<O>;
function asUnclosable<I, O>(coroutine: FullCoroutine<I, O>): FullCoroutine<I, O>;
function asUnclosable(coroutine: Coroutine): any {
	return {
		next: coroutine.next.bind(coroutine),
		return: getDoneItem,
		throw: rethrow,
		[Symbol.iterator]() {
			return this;
		},
	};
}

export { asUnclosable };

function close<I, R>(coroutine: Observer<I>, tryBeforeClosing?: (coroutine: Observer<I>) => R): R | undefined;
function close<O, R>(coroutine: SimpleIterator<O>, tryBeforeClosing?: (coroutine: SimpleIterator<O>) => R): R | undefined;
function close<I, O, R>(coroutine: FullCoroutine<I, O>, tryBeforeClosing?: (coroutine: FullCoroutine<I, O>) => R): R | undefined;
function close<R>(coroutine: any, tryBeforeClosing?: (coroutine: any) => R): R | undefined {
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

export { close };

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

	[Symbol.iterator](): Iterator<Coroutine> {
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
