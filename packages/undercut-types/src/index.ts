export type Action<T> = (value: T, index: number) => void;

export type Comparator<T> = (a: T, b: T) => number;

export type Defined = bigint | boolean | null | number | object | string | symbol;

export type Falsy = Nullish | false | 0 | 0n | "";

export type KeyGroup<K, T> = [K, Array<T>];

export type Mapper<T, R> = (value: T, index: number) => R;

export type Nullish = null | undefined;

export type Predicate<T> = (value: T, index: number) => boolean;

export type Narrower<T, R extends T> = (value: T, index: number) => value is R;

export type Observer<T> = Generator<void, void, T>;

export type Primitive = bigint | boolean | number | string | symbol | undefined;

export type PullOperation<T, R = T> = (iterable: Iterable<T>) => Iterable<R>;

export type PullTarget<T, R = T> = (iterable: Iterable<T>) => R;

export type RecMapper<T, R = T> = (item: T, index: number, depth: number) => R;

export type RecPredicate<T, R = T> = (item: R | Iterable<T>, index: number, depth: number) => item is Iterable<T>;

export type Reducer<T, R> = (accumulator: R, value: T, index: number) => R;


// TODO: Make index mandatory
export type Selector<T, R> = (value: T, index?: number) => R;
