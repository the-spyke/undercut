export type Comparator<T> = (a: T, b: T) => number;

export type Nullish = null | undefined;

export type Predicate<T> = (value: T, index?: number) => boolean;

export type Selector<T, R> = (value: T) => R;
