import type { PullOperation } from "@undercut/types";

import { concatEnd } from "./concat";

export function append<T>(...items: Array<T>): PullOperation<T> {
	return concatEnd(items);
}
