import type { Falsy, PushOperation } from "@undercut/types";

import { isTruthy } from "@undercut/utils";

import { filter } from "./filter";

export function compact<T>(): PushOperation<T, Exclude<T, Falsy>> {
	return filter(isTruthy);
}
