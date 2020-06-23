---
title: Object Utilities
---

- [collectProps](#collectprops)
- [filterProps](#filterprops)
- [mapKeys](#mapkeys)
- [mapValues](#mapvalues)
- [reduceProps](#reduceprops)

### collectProps

`collectProps(object, collector, collection = {}) => collection`

Helps to fill the `collection` with data from the provided `object`. The process is manual, and done by the `collector` function getting key and value a time.

`Collect` has an advantage over `reduce` in cases where you mutate the initial value, so you don't have to return anything (shorted and cleaner code).

```js
const user = {
    id: 123,
    firstName: "Sam",
    lastName: "Bridges",
};

// By default collets into a new object:
const userData = collectProps(
    user,
    (col, key, value) => (col[key] = key === "id" ? hash(value) : value)
);

// {id: "202cb9", firstName: "Sam", lastName: "Bridges"}

// But you can pass some specific collection instead:
const userMap = collectProps(
    user,
    (map, key, value) => map.set(key, String(value)),
    new Map()
);

// Map {"id" => "123", "firstName" => "Sam", "lastName" => "Bridges"}
```

### filterProps

`filterProps(object, predicate) => object`

Creates a new object based on the provided `object` with properties copied over, but filtered by the `mapper` function.

```js
const user = {
    id: 123,
    firstName: "Sam",
    lastName: "Bridges",
};

const userData = filterProps(user, key => key !== "id");

// {firstName: "Sam", lastName: "Bridges"}
```

### mapKeys

`mapKeys(object, mapper) => object`

Creates a new object based on the provided `object` with its keys passed through the `mapper` function and values copied over.

```js
const user = {
    id: 123,
    firstName: "Sam",
    lastName: "Bridges",
};

const userData = mapKeys(user, key => `_${key}`);

// {_id: 123, _firstName: "Sam", _lastName: "Bridges"}
```

### mapValues

`mapValues(object, mapper) => object`

Creates a new object based on the provided `object` with its keys copied over and values passed through the `mapper` function.

```js
const user = {
    id: 123,
    firstName: "Sam",
    lastName: "Bridges",
};

const userData = mapValues(user, (key, value) => value + 1);

// {id: 124, firstName: "Sam1", lastName: "Bridges1"}
```

### reduceProps

`reduceProps(object, reducer, initialValue) => ReducerReturnValue`

Helps to reduce provided `object` into some value by passing its keys and values through the the `reducer`.

```js
const user = {
    id: 123,
    firstName: "Sam",
    lastName: "Bridges",
};

const userData = reduceProps(user, (acc, key, value) => acc + key + value, "");

// "id123firstNameSamlastNameBridges"
```
