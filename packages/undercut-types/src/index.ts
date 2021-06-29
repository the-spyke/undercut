export type Action<T> = (value: T, index: number) => void;

export type AnyObject<V = unknown> = Record<PropertyKey, V>;

export type Comparator<T> = (a: T, b: T) => number;

export type Coroutine<I = unknown, O = I> = FullCoroutine<I, O> | Observer<I> | SimpleIterator<O>;

export interface CoroutineBase {
	return?(value?: any): void;
	throw?(error: Error): any;
}

export type Defined = bigint | boolean | null | number | object | string | symbol; // eslint-disable-line @typescript-eslint/ban-types

export type EmptyObject = Record<PropertyKey, never>;

export type Falsy = Nullish | false | 0 | 0n | ""; // eslint-disable-line quotes

export interface FullCoroutine<I = unknown, O = unknown> extends CoroutineBase {
	next(value: I): IteratorResult<O>;
}

export type Mapper<T, R> = (value: T, index: number) => R;

export type Nullish = null | undefined;

export type Predicate<T> = (value: T, index: number) => boolean;

export type Narrower<T, R extends T> = (value: T, index: number) => value is R;

export interface Observer<T> extends CoroutineBase {
	next(value: T): void;
}

export type Primitive = bigint | boolean | number | string | symbol | undefined;

export type PullOperation<T, R = T> = (iterable: Iterable<T>) => Iterable<R>;

export type PullTarget<T, R = T> = (iterable: Iterable<T>) => R;

export type PushOperation<T, R = T> = (observer: Observer<R>) => Observer<T>;

export type RecMapper<T, R = T> = (item: T, index: number, depth: number) => R;

export type RecPredicate<T> = (item: T, index: number, depth: number) => boolean;

export type Reducer<T, R> = (accumulator: R, value: T, index: number) => R;

export type Selector<T, R> = (value: T) => R;

export interface SimpleIterator<T> extends CoroutineBase {
	next(): IteratorResult<T>;
}
