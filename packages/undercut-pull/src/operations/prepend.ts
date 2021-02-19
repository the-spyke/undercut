import type { PullOperation } from "@undercut/types";

import { concatStart } from "./concat";

export function prepend<T>(...items: Array<T>): PullOperation<T> {
	return concatStart(items);
}
