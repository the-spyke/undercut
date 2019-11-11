import { runPerfSuite } from "../utils/perf.js";

const x = [1, 2, 3, 4];

function restArgs(...args) {
	return args;
}

function manual4(x, y, z, z2) {
	return [x, y, z, z2];
}

runPerfSuite(`rest-spread`, {
	"base": () => {
		return manual4(x[0], x[1], x[2], x[3]);
	},
	"spread": () => {
		return manual4(...x);
	},
	"rest": () => {
		return restArgs(x[0], x[1], x[2], x[3]);
	},
	"spread-rest": () => {
		return restArgs(...x);
	},
});
