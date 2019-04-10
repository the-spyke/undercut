export function pullLine(pipeline, source) {
	return pipeline.reduce((iterable, generator) => generator(iterable), source);
}

export function pull(target, pipeline, source) {
	target(pullLine(pipeline, source));
}
