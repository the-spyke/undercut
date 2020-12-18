---
title: Pull Sources
---

Pull sources are just iterables.

### range

`range(start, end, step = 1) => Iterable`

Creates an iterable of numbers from the `start` to (not including) the `end` by the `step` (optional, only positive because the sign will be chosen depending on whether the `start` is or isn't less than the `end`).

```js
[...range(2, 5)]; // [2, 3, 4]
[...range(2, 5, 2)]; // [2, 4]
[...range(5, 2)]; // [5, 4, 3]
```
