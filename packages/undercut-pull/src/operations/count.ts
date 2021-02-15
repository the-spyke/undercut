import { reduce } from "./reduce";

export function count() {
	return reduce(acc => acc + 1, 0);
}
