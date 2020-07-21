---
title: Random Utilities
---

Random utilities use `Math.random()` under the hood, so they shouldn't be used for security related tasks. Use Cryto API for that instead.

- [randomBoolean](#randomboolean)
- [randomDecimal](#randomdecimal)
- [randomFrom](#randomfrom)
- [randomIndex](#randomindex)
- [randomInteger](#randominteger)

### randomBoolean

`randomBoolean() => boolean`

Returns `true` or `false` with probability of `0.5`.

```js
randomBoolean(); // false
randomBoolean(); // true
randomBoolean(); // true
```

### randomDecimal

`randomDecimal(min, max) => number`

Returns a random decimal number from `min` (included) to `max` (excluded) uniformly distributed.

```js
randomDecimal(0, 10); // 3.5477013297040689
randomDecimal(0, 10); // 0
randomDecimal(0, 10); // 9.9999999999999999
```

### randomFrom

`randomFrom(source) => item`

Pick a random item from an array or a charecter from a string. Uniform distribution.

```js
randomFrom([1, 2, 3]); // 3
randomFrom([1, 2, 3]); // 1

randomFrom("asdf"); // a
randomFrom("asdf"); // d
```

### randomIndex

`randomIndex(source) => number`

Pick a random index in an array or a string. Uniform distribution.

```js
randomIndex([1, 2, 3]); // 2
randomIndex([1, 2, 3]); // 1

randomIndex("asdf"); // 0
randomIndex("asdf"); // 3
```

### randomInteger

`randomInteger(min, max) => number`

Returns a random integer number from `min` (included) to `max` (excluded) uniformly distributed.

```js
randomInteger(0, 10); // 7
randomInteger(0, 10); // 9
randomInteger(0, 10); // 0
```
