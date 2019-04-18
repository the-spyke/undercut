import { concatStart } from "./concat.js";

export function prepend(...items) {
	return concatStart(items);
}
