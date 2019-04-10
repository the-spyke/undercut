import { reducePull } from "./reduce";

function summator(acc, x) {
	return acc + x;
}

export function sumPull() {
	return reducePull(summator, 0);
}
