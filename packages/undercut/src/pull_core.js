export function pullLine(pipeline, source) {
	let iterable = source;

	for (const generator of pipeline) {
		iterable = generator(iterable);
	}

	return iterable;
}

export function pull(target, pipeline, source) {
	target(pullLine(pipeline, source));
}
