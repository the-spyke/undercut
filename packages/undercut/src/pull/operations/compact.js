import { isTruthy } from "../../utils/lang.js";

import { filter } from "./filter.js";

export function compact() {
	return filter(isTruthy);
}
