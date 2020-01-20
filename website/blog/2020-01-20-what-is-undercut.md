---
id: what-is-undercut
title: What is undercut.js?
tags: [tutorial]
---

[Undercut.js](https://undercut.js.org) (or simply `undercut`) is a library for processing data in a lazy or deferred manner by building pipelines.

The focus of the library is on leveraging existing JavaScript features like Iterators / Observers / Generators / ES Modules while having balanced API: not being Java/C# influenced or heavily functional. Generators alone allows you to write various operations is a couple of lines, but `undercut` also aims to avoid prototype extension and a situation, where you need to name a method as `flat` instead of `flatten`. You may also use it as an alternative to Lodash's `chain` functionality with support for lazy execution, tree shaking, etc.

Imagine a conveyor on a car factory: a chain of operations from welding body parts and painting doors to gluing a logo and inflating wheels. Every operation is independent and is based only on a protocol: a car comes from this side and goes to that side after the operation is complete.

In JavaScript we may represent this as an array of functions:

```js
const pipeline = [
    skip,
    map,
    filter,
    take,
];
```

Of course, those operations have some input data: this car should have 17" wheels, that car should have 16" wheels. We can do this too:

```js
const pipeline = [
    skip(1),
    map(x => x - 3),
    filter(x => x !== 4),
    take(100),
];
```

Calling `skip(1)` creates a function (operation) that knows how to skip exactly 1 item (car).

Sometimes you need to make a new model with additional equipment package. It may be as simple as adding a couple of steps to the conveyor:

```js
const pipeline_2 = [
    ...pipeline,
    filter(x => x < 1000)
];
```

Or replacing some steps in existing:

```js
pipeline[1] = map(x => x - 4);
```

Arrays give you this flexibility to concatenate, merge, copy, and modify existing pipelines.

To finish the conveyor there should be some mechanism like moving belt that will transport a car from one operation from another. This is where `undercut` tries to help (not mentioning a pack of 40+ prebuilt common operations like filter/map/skip/etc).

[Core pull functions](https://undercut.js.org/docs/pull/core-functions) allow you to quickly run a pipeline and acquire the result or combine it into something self-contained and reusable like an Iterable.

Having a list of numbers called `source`:

```js
const source = [1, 2, 3, 4, 5, 6, 7];
```

And a `pipeline` of operations:

```js
const pipeline = [
    skip(1),
    map(x => x - 3),
    filter(x => x !== 4),
    take(100),
];
```

We could `pull` items out of the `source` through the `pipeline` and get an array of result items:

```js
const result = pullArray(pipeline, source);
```

In our case `result` will be:

```js
[ -1, 0, 1, 2, 3 ]
```

All is done lazily, so `map` won't run for the skipped item. There're also `pullValue`, if your result is a single value (not a sequence). Or more generic `pull`, where you pass `target` function getting result items and converting it into whatever you want.

As `pull` is built around Iterables, and many native objects are Iterable out of the box (arrays, strings, maps, sets, etc), you can easily transform a Map of Usernames-by-Id into an Object of Ids-by-Username.

```js
const namesById = new Map([
    ["root", 0],
    ["sam", 1000],
    ["kate", 1004],
]);

const pipeline = [
    filter(entry => entry[0] > 0),
    map(entry => [entry[1], entry[0]]),
];

const idsByNameObj = pull(Object.fromEntries, pipeline, namesById);

// idsByNameObj == Object {"1000":"sam","1004":"kate"}
```

Moreover, you may create a reusable `view` of this data:

```js
const idsByName = pullLine(pipeline, source);
```

The `pullLine` function binds together a `pipeline` and a `source` into an Iterable. Every time you iterate over it, the pipeline will be executed again, giving you a fresh view on processed data.

```js
namesById.set("sam", 1111);

console.log(Object.fromEntries(idsByName)); // Object {"1111":"sam","1004":"kate"}
```

Every operation is just a function, so you can create your own. Or even create a whole library of your own operations and reuse in different projects. The protocol, operations rely on, is similar to `car-in/car-out`, but instead of cars there're Iterables. An operation get an Iterable of items to process and return an Iterable of processed items. Returning an Iterable sounds complicated, but it isn't with JavaScript Generators.

Let's build a `pow` operation:

```js
function* powOperation(iterable) {
    for (const item of iterable) {
        const newItem = Math.pow(item, exponent);

        yield newItem;
    }
}
```

Get an Iterable, go by its items, calculate new values, put them into another iterable with `yield`.

_If you aren't familiar with generators (functions marked with `*` asterisk). Basically, the return value of such function will be not what you return, but an implicit Iterable you can put items into with the `yield` keyword. Please read [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) for more detailed decsription. I also recommend reading an awesome book [Exploring ES6](https://exploringjs.com/es6.html) by Dr. Axel Rauschmayer._

Actually, one important aspect is missing. The `exponent` value isn't defined and should be assigned in a pipeline like those 17" wheels. To fix this just add another function around:

```js
function pow(exponent) {
    function* powOperation(iterable) {
        for (const item of iterable) {
            const newItem = Math.pow(item, exponent);

            yield newItem;
        }
    }
}
```

And this `pow` we can actually use:

```js
const source = [0, 1, 2];
const pipeline = [
    map(x => x + 1),
    pow(2),
];

const result = pullArray(pipeline, source);

console.log(result); // [1, 4, 9]
```

It is only a brief review of the `undercut`, but should be enough for basic use cases. If you want to learn more, please with [undercut.js.org](https://undercut.js.org) for documentation and tutorials.
