---
title: Iterable Utilities
---

Functions to work with Iterables.

### createIterable

`createIterable(function) => Iterable`

Makes an `Iterable` from a provided function. It could be a generator or a factory, but must return a new `Iterator` every time.

```js
const iterable = createIterable(function* () {
    while (true) yield Math.random();
});

const [x, y] = iterable;
const [z] = iterable;

// x === 0.6486486024235587
// y === 0.3952175724953333
// z === 0.8863071830215743
```

### getIterator

`getIterator(iterable) => Iterator`

Calls the `Symbol.iterator` method of the `iterable` for you.

```js
const iterator = getIterator(`undercut`);

// Iterator {}

iterator.next();

// {value: "u", done: false}
```

### getRecursiveMapper

`getRecursiveMapper(predicate, mapper) => Mapper`

Creates a mapper function to use with the `map` operation. Converts every incomming item into an Iterable of all nested bubitems. The `predicate` helps to choose if the item should be iterated. The `mapper`, if specified, allows to convert the item before checking it with the `predicate` and iterating over it.

### head

`head(Iterable) => item`

Returns the first item of the `iterable` or `undefined`.

```js
const firstLetter = head(`undercut`);

// "u"

const firstItem = head([3, 2, 1]);

// 3
```

### headTail

`headTail(Iterable) => { head, tail }`

Returns an object with the `head` (the first item, if it exists) and the `tail` (an iterator for remaining items, if there are some).

Missing `tail` tells that the `iterable` is empty and there is no `head` value.

```js
const htString = headTail(`undercut`);

// {head: "u", tail: Iterator}

const htArray = headTail([3, 2, 1]);

// {head: 3, tail: Iterator}
```

Having a `tail` wich is an Iterator used to get remaining items allows you to check if there really was a head:

```js
const noHead = head([]);

// undefined

const obscureHead = head([undefined]);

// undefined

const noHeadTail = headTail([]);

// {head: undefined, tail: undefined}

const obscureHeadTail = headTail([undefined]);

// {head: undefined, tail: Iterator}
```

Notice that in case of an empty `iterable` there is no tail, but in case of an `iterable` with more than 0 items there is a tail. This happens because of how Iterators work: you don't know if there is another item until you get `done` set to `true`, so you need to call `next` one more time.

You may also use this for writing loops:

```js
let head = undefined;
let tail = [1, 2, 3];

// While there is a tail, split it into a head and a tail.
while (({ head, tail } = headTail(tail)).tail) {
    console.log(head);
}

// 1
// 2
// 3
```

### tail

`tail(Iterable) => Iterator`

Returns the `tail` (an iterator for remaining items) of the `iterable`. In case of an empty `iterable` returns `undefined`.

```js
const remaining = tail([3, 2, 1]);

for (const item of remaining) {
    console.log(item);
}

// 2
// 1
```

Notice that you can't use it to check if there are multiple items. Iterators work this way that you need to call `next` one more time to look into second `done` flag.
