import { reduce } from "./reduce.js";

function counter(acc) {
	return acc + 1;
}

export function count() {
	return reduce(counter, 0);
}
