import { concatStart } from "./concat";

export function prepend(...items) {
	return concatStart(items);
}
