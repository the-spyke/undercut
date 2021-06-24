import type { Observer } from "@undercut/types";

export function getArrayObserver<T>(array: Array<T>): Observer<T> {
	return {
		next(value) {
			array.push(value);
		},
		return(value: any) {
			return { value, done: true };
		},
		throw(error) {
			throw error;
		},
	};
}
