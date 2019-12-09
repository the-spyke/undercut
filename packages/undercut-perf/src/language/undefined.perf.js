import { runPerfSuite } from "../perf.js";

const x = [1, 2, 4];

function isUndefinedEqual(value) {
	return value === undefined;
}

function isUndefinedType(value) {
	return typeof value === `undefined`;
}

function isDefined(value) {
	return typeof value !== `undefined`;
}

runPerfSuite(`min : check for undefined`, {
	"equality": () => {
		return isUndefinedEqual(x) === false;
	},
	"typeof": () => {
		return isUndefinedType(x) === false;
	},
	"defined": () => {
		return isDefined(x) === true;
	}
});

function isTruthyNegation(value) {
	return !!value;
}

function isTruthyTenary(value) {
	return value ? true : false;
}

function isTruthyBoolean(value) {
	return Boolean(value);
}

runPerfSuite(`min : check is truthy`, {
	"negation": () => {
		return isTruthyNegation(x) === true;
	},
	"tenary": () => {
		return isTruthyTenary(x) === true;
	},
	"boolean": () => {
		return isTruthyBoolean(x) === true;
	}
});
