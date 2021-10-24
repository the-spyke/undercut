import type { PullOperation } from "@undercut/types";

import { reduce } from "./reduce";

export function sum(): PullOperation<number> {
	return reduce((acc, x) => acc + x, 0);
}
