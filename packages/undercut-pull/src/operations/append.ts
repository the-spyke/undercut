import { concatEnd } from "./concat";

export function append<T, R = T>(...items: Array<R>) {
	return concatEnd<T, R>(items);
}
