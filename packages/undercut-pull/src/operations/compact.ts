import { isTruthy } from "@undercut/utils";

import { filter } from "./filter";

export function compact() {
	return filter(isTruthy);
}
