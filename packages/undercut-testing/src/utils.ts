import type { Observer } from "@undercut/types";

import { asObserverFactory } from "@undercut/utils";

export function getArrayObserver<T>(array: Array<T>) {
	return asObserverFactory(function* (): Observer<T> {
		while (true) {
			array.push(yield);
		}
	})();
}
