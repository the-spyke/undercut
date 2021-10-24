import { Falsy, PullOperation } from "@undercut/types";

import { isTruthy } from "@undercut/utils";

import { filter } from "./filter";

export function compact<T>(): PullOperation<T, Exclude<T, Falsy>> {
	return filter(isTruthy);
}
