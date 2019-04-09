export function pullLine(pipepline, source) {
	return pipepline.reduce((iter, gen) => gen(iter), source);
}

export function pull(target, pipeline, source) {
	target(pullLine(pipeline, source));
}
