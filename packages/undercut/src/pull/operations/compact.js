import { isTruthy } from "../../utils/language.js";

import { filter } from "./filter.js";

export function compact() {
	return filter(isTruthy);
}
