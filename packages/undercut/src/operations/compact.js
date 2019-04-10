import { isTrue } from "../utils/lang.js";

import { filterPull } from "./filter.js";

export function compactPull() {
	return filterPull(isTrue);
}
