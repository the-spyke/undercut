---
title: Ordering Utilities
---

Functions for creating comparators used in `sort` and `groupBy`. Comparators are universal `(a, b) => number`.

### asc

`asc(comparator, selector) => Comparator`

Used itself as a value for specifying ascending sorting direction, or as a factory function for building orders for `orderBy`.

### composeComparators

`composeComparators(comparators) => Comparator`

Composes several comparators into one.

### desc

`desc(comparator, selector) => Comparator`

Used itself as a value for specifying descending sorting direction, or as a factory function for building orders for `orderBy`.
