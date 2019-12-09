import { isTruthy } from "@undercut/utils/src/language.js";

import { filter } from "./filter.js";

export function compact() {
	return filter(isTruthy);
}
