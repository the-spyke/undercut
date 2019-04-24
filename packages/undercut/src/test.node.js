/* eslint-env node */

import { deepEqual } from "assert";

import {
	pull,
	filter, map, skip, take,
	toArray
} from "./pull.js";

const data = [1, 2, 3, 4, 5, 6, 7];
const pipeline = [
	map(x => x + 3),
	skip(1),
	take(100),
	map(x => x - 3),
	filter(x => x !== 4),
];

const result = pull(toArray, pipeline, data);

deepEqual(result, [2 ,3, 5, 6, 7]);

console.info("OK");
