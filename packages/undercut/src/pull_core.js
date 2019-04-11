export function pullLine(pipeline, source) {
	return pipeline.reduce((iterable, generator) => generator(iterable), source);
}

export function pull(target, pipeline, source) {
	return target(pullLine(pipeline, source));
}
