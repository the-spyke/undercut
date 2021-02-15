import { getRecursiveMapper } from "@undercut/utils";

export function flatMap(predicate, mapper) {
	const recursiveMapper = getRecursiveMapper(predicate, mapper);

	return function* (iterable) {
		let index = 0;

		for (const item of iterable) {
			const childItems = recursiveMapper(item, index);

			for (const childItem of childItems) {
				yield childItem;
			}

			index++;
		}
	};
}
