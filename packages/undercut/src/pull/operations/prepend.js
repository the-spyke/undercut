import { concatStart } from "./concat_start.js";

export function prepend(...items) {
	return concatStart(items);
}
