import type { PushOperation } from "@undercut/types";

import { concatEnd } from "./concat";

export function append<T>(...items: T[]): PushOperation<T> {
	return concatEnd(items);
}
