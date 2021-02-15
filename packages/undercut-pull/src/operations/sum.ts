import { reduce } from "./reduce.js";

export function sum() {
	return reduce((acc, x) => acc + x, 0);
}
