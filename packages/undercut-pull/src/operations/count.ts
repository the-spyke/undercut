import type { PullOperation } from "@undercut/types";

import { reduce } from "./reduce";

export function count(): PullOperation<number> {
	return reduce(acc => acc + 1, 0);
}
