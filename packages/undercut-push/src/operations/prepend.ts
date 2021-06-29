import type { PushOperation } from "@undercut/types";

import { concatStart } from "./concat";

export function prepend<T>(...items: T[]): PushOperation<T> {
	return concatStart(items);
}
