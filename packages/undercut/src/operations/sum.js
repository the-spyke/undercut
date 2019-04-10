import { reducePull } from "./reduce.js";

function summator(acc, x) {
	return acc + x;
}

export function sumPull() {
	return reducePull(summator, 0);
}
