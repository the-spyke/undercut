import { reduce } from "./reduce";

export function sum() {
	return reduce((acc, x) => acc + x, 0);
}
