/* eslint-env node */

import assert from "assert";

import {
	pull,
	filter, map, skip, sum, take,
	toValue
} from "./pull.js";

const data1 = [1, 2, 3, 4, 5, 6, 7];
const pipeline1 = [
	map(x => x + 3),
	skip(1),
	take(100),
	map(x => x - 3),
	filter(x => x !== 4),
];

const result = pull(toValue, [
	...pipeline1,
	sum(),
	map(x => x + 0.5),
], data1);

assert(result === 23.5, "Invalid result");

console.info("OK");
