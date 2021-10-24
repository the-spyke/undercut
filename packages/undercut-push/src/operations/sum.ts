import type { PushOperation } from "@undercut/types";

import { reduce } from "./reduce";

export function sum(): PushOperation<number> {
	return reduce((acc, x) => acc + x, 0);
}
