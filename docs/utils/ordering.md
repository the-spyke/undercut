---
title: Ordering Utils
---

- `asc(comparator, selector) => Comparator` -- used itself as a value for specifying ascending sorting direction, or as a factory function for building orders for `orderBy`.
- `composeComparators(comparators) => Comparator` -- composes several comparators into one.
- `desc(comparator, selector) => Comparator` -- used itself as a value for specifying descending sorting direction, or as a factory function for building orders for `orderBy`.
