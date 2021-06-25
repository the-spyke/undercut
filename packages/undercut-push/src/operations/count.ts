import { reduce } from "./reduce.js";

export function count() {
	return reduce(acc => acc + 1, 0);
}
