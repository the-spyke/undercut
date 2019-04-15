import { reduce } from "./reduce.js";

function summator(acc, x) {
	return acc + x;
}

export function sum() {
	return reduce(summator, 0);
}
