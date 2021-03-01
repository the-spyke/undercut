export type Action<T> = (value: T, index: number) => void;

export type Comparator<T> = (a: T, b: T) => number;

export interface Coroutine<I = unknown, O = unknown> extends Iterator<O, void, I> {} // eslint-disable-line @typescript-eslint/no-empty-interface

export type Defined = bigint | boolean | null | number | object | string | symbol; // eslint-disable-line @typescript-eslint/ban-types

export type Falsy = Nullish | false | 0 | 0n | ""; // eslint-disable-line quotes

export type KeyGroup<K, T> = [K, Array<T>];

export type Mapper<T, R> = (value: T, index: number) => R;

export type Nullish = null | undefined;

export type Predicate<T> = (value: T, index: number) => boolean;

export type Narrower<T, R extends T> = (value: T, index: number) => value is R;

export interface Observer<T = unknown> extends Coroutine<T, void> {} // eslint-disable-line @typescript-eslint/no-empty-interface

export type Primitive = bigint | boolean | number | string | symbol | undefined;

export type PullOperation<T, R = T> = (iterable: Iterable<T>) => Iterable<R>;

export type PullTarget<T, R = T> = (iterable: Iterable<T>) => R;

export type RecMapper<T, R = T> = (item: T, index: number, depth: number) => R;

export type RecPredicate<T, R = T> = (item: R | Iterable<T>, index: number, depth: number) => item is Iterable<T>;

export type Reducer<T, R> = (accumulator: R, value: T, index: number) => R;

export type Selector<T, R> = (value: T) => R;
