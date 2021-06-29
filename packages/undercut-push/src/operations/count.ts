import type { PushOperation } from "@undercut/types";

import { reduce } from "./reduce";

export function count(): PushOperation<unknown, number> {
	return reduce(acc => acc + 1, 0);
}
