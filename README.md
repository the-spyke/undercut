# ✂ undercut ✂

[![version](https://img.shields.io/npm/v/undercut.svg)](https://www.npmjs.com/package/undercut)
[![downloads](https://img.shields.io/npm/dm/undercut.svg)](https://www.npmjs.com/package/undercut)
[![chat](https://badges.gitter.im/undercutjs/community.svg)](https://gitter.im/undercutjs/community)
[![license](https://img.shields.io/npm/l/undercut.svg)](https://github.com/the-spyke/undercut/blob/master/LICENSE)

[![circleci](https://circleci.com/gh/the-spyke/undercut.svg?style=shield)](https://circleci.com/gh/the-spyke/undercut)
[![codecov](https://codecov.io/gh/the-spyke/undercut/branch/master/graph/badge.svg)](https://codecov.io/gh/the-spyke/undercut)

JavaScript data processing pipelines and utilities. Use native Iterators/Generators/Observers like it's 2015 already.

- Based on existing JS protocols and language features
- Balanced API: not too imperative, not too functional
- Easy operation extensibility and composability
- Pure ES Modules with Node 13 loader compliance
- Raw code in the package + precompiled versions
- Lazy evaluation when possible
- Tree shaking friendliness

## Quicklinks

- [Installation](#installation)
- [Usage](#usage)
- [Concepts](#concepts)
- [Pull](#pull)
- [Push](#push)
- [Operations](#operations)
- [Utilities](#utilities)
- [License](#license)

## Installation

`Undercut` comes in several flavors. The `@undercut/(pull|push|utils)` packages are the intended way to consume it. These packages carry `stable ES Next` code. It is very convenient for apps using Webpack/Babel/etc, and will help to avoid double compilation and deoptimization. Only [finished proposals (Stage 4)](https://github.com/tc39/proposals/blob/master/finished-proposals.md) may be used in its codebase. The code is universal and may be used in Node/Browser/microwave.

Don't forget check that `/node_modules/@undercut/` isn't excluded from compilation and `core-js@3` polyfill or analogue is in place.

Several precompiled packages are provided for older projects or quick experiments. They do not require any sort of compilaton, just a polyfill:

- `@undercut/node-10` -- a precompiled CommonJS version for Node.js 10 LTS and upwards. Requires stable polyfills from `core-js@3`.
- `@undercut/web-2019` -- a precompiled version for Web browsers not older than 2019-01-01. Creates the `undercut` property in the `window`, may also be used by CJS/AMD loaders. Requires stable polyfills from `core-js@3`.
- `@undercut/cli` -- a command line interface for processing data with JavaScript and `undercut` in shells. Accepts items from `stdin` and puts results into `stdout`. [Read more in package's readme.](packages/undercut-cli/README.md)

```sh
npm install @undercut/pull
# or
yarn add @undercut/pull
```

For precompiled packages it may be handy to use [Yarn aliases](https://yarnpkg.com/en/docs/cli/add#toc-yarn-add-alias):

```sh
yarn add undercut@npm:@undercut/node-10
```

### Upgrading `undercut`

If you're upgrading the `undercut` to a newer version, upgrade `@babel/preset-env` and `core-js` packages to the latest versions too.

## Usage

[![Edit undercut-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/undercut-example-9g1nh?fontsize=14&module=%2Fsrc%2Findex.js)

```js
import { pullArray, filter, map, skip } from "@undercut/pull";

const source = [1, 2, 3, 4, 5, 6, 7];

const result = pullArray([
    skip(2),
    filter(x => x % 3 === 0),
    map(x => x * 2) // Will be executed only 3 times.
], source);

console.log(result); // [8, 10, 14]
```

There are 3 main packages:

- `@undercut/pull` -- exports Pull Lines (Iterables) + a couple of utils.
- `@undercut/push` -- exports Push Lines (Observers) + a couple of utils.
- `@undercut/utils` -- exports all the various JavaScript utilities that `undercut` provides.

Package entry points are stable, so any export removal/renaming is as a breaking change.

## Concepts

`Undercut` helps constructing pipelines for data processing. Instead of creating new concepts it leverages existing JavaScript protocols and features like [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) and [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

`Pipelines` is just a term for ordered sequences of operations (just like a conveyor on a factory). Imagine you want to process a bunch of `source` items and put the result items somewhere (`target`).

```text
source ----> [ op_0 | op_1 | ... | op_N ] ----> target
                       pipeline
```

Depending on the fact whether the `source` items are or aren't yet available you will have two different approaches: `pull` and `push`.

If `source` items are available at the moment of execution, we can *pull* items from it one by one and process them synchronously. `Undercut` call this a `Pull Line`. It is created by combining a `source` and a `pipeline` into an `Iterable`. This `Iterable` may be passed around and used by any native ES construct like `for-of` loop to read the result. `Undercut` also provides a bunch of `target` helpers for one-line extracting results out of Iterables into common structures like arrays/objects/maps/etc.

```text
Pull Line -- pull items from an Iterable

( source + pipeline = Iterable )
```

If `source` items are **not** available at the moment of execution, we have to process items as they appear. We can do this by *pushing* items into a `Push Line`. It is created by combining a `pipeline` and a `target` into an `Observer`. `Observers` are convenient in use cases like reacting on a button click and may be passed around or used by several producers.

```text
Push line -- push items into an Observer

( pipeline + target = Observer )
```

Of course, you can process synchronous items with `Push Lines` too, but `Pull Lines` are easier to operate and write operations for.

## Pull

[See Pull documentation in its package](packages/undercut-pull/README.md)

## Push

[See Push documentation in its package](packages/undercut-push/README.md)

## Operations

Operation exist in both `pull` and `push` versions:

- `append(...items)` -- adds its arguments to the end of the sequence.
- `average()` -- reduces the sequence into a number by calculating the average of it.
- `chunk(size)` -- groups items in the sequence into arrays of `size` items.
- `compact()` -- removes all falsy items from the sequence.
- `concatEnd(source)` -- adds items from the `source` to the end of the sequence.
- `concatStart(source)` -- adds items from the `source` to the beginning of the sequence.
- `count()` -- reduces the sequence into a number by countint items in it.
- `difference(...sources)` -- removes sources' items from the sequence matching by their identity.
- `differenceBy(selector, ...sources)` -- removes sources' items from the sequence matching by the `selected` value.
- `every(predicate)` -- reduces the sequence into a boolean by calculating if the `predicate` returns `true` for every item.
- `filter(predicate)` -- removes all items from the sequence for which the `predicate` returns `false`.
- `find(predicate)` -- reduces the sequence to the first item for which `predicate` have returned `true`.
- `findIndex(predicate)` -- reduces the sequence to the index of the first item for which the `predicate` have returned `true`.
- `first()` -- removes all items from the sequence, but the first one.
- `flatten(depth = 1)` -- flattens nested arrays in the sequence `depth` levels deep. `depth` can be `Infinity`.
- `flattenIterables(depth = 1)` -- flattens nested iterables in the sequence `depth` levels deep. `depth` can be `Infinity`.
- `forEach(action)` -- executes the `action` for every item in the sequence, used for side effects.
- `groupBy(keySelector)` -- groups items of the sequence into the new `[key, items]` items matching by the `selected key`.
- `includes(value)` -- reduces the sequence into a boolean depending on whether the `value` was found in it.
- `interleave(...sources)` -- interleaves sources' items into the sequence in round-robin fashion.
- `intersection(...sources)` -- reduces the sequence to items to which have identicals in every source.
- `intersectionBy(selector, ...sources)` -- reduces the sequence to items to which have identicals in every source matching by the `selected` value.
- `join(separator = ",")` -- reduces the sequence into a string, works the same as `Array.prototype.join()`.
- `last()` -- removes all items from the sequence, but the last one.
- `map(mapper)` -- transforms the sequence into a new one by `mapping` all its items.
- `max()` -- reduces the sequence into a number by finding maximum value.
- `min()` -- reduces the sequence into a number by finding minimum value.
- `nth(n)` -- removes all items from the sequence, but the `n`th one.
- `orderBy(...orderingSpecs)` -- reorders items in the sequence by ordering specs, you build them with `asc` and `desc` utilities.
- `prepend(...items)` -- adds its arguments to the beginning of the sequence.
- `reduce(reducer, initial = undefined)` -- reduces the sequence into a value starting with the `initial` one and executing the `reducer` for every item.
- `remove(predicate)` -- removes all items from the sequence for which the `predicate` returns `true`.
- `reverse()` -- reverses the order of the items in the sequence.
- `skip(count)` -- removes the first `count` items from the sequence.
- `skipWhile(predicate)` -- removes the first items from the sequence for which the `predicate` consequently have returned `true`.
- `some()` -- reduces the sequence into a boolean by calculating if the `predicate` returns `true` at least for one item.
- `sort(comparator, order = asc)` -- sorts the items in the sequence using the `comparator`.
- `sortNumbers(order = asc)` -- sorts the items as numbers in the sequence.
- `sortStrings(order = asc)` -- sorts the items as strings in the sequence.
- `sum()` -- reduces the sequence into a number by summing all items.
- `symmetricDifference(...sources)` -- reduces the sequence by applying [Symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference) with sources' items matching by their identity.
- `symmetricDifferenceBy(selector, ...sources)` -- reduces the sequence by applying [Symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference) with sources' items matching by the `selected` value.
- `take(count)` -- reduces the sequence the the first `count` items.
- `takeWhile(predicate)` -- reduces the sequence the the first `count` items for which the `predicate` consequently have returned `true`.
- `union(...sources)` -- reduces the sequence by combining it with sources an leaving only unique items matching by their identity.
- `unionBy(selector, ...sources)` -- reduces the sequence by combining it with sources an leaving only unique items matching by the `selected` value.
- `unique()` -- educes the sequence by leaving only unique items matching by their identity.
- `uniqueBy(selector)` -- reduces the sequence by combining it with sources an leaving only unique items matching by the `selected` value.
- `unzip()` -- reverse to the `zip` producing a sequence of sources.
- `unzipWith(itemsExtractor)` -- reverse to the `zip` producing a sequence of sources by getting their items from the `extractor`.
- `zip(...sources)` -- transforms the sequence into a new one by combining by one item from it and the sources into an array.
- `zipWith(itemFactory, ...sources)` -- transforms the sequence into a new one by combining by one item from it and the source into a value returned by the `itemFactory`.

## Utilities

Some utilities related to pull and push operations are exported in `pull` and `push` packages too, but they identical to those in the `@undercut/utils` package, which exports [all the list](packages/undercut-utils/README.md).

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
