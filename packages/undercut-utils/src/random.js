import { assert } from "./assert.js";
import { isNumberValue, isPositive } from "./language.js";

/**
 * @returns {boolean}
 */
export function randomBoolean() {
	return Math.random() < 0.5;
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomDecimal(min, max) {
	assert(isNumberValue(min), `"from" should be a number.`);
	assert(isNumberValue(max), `"to" should be a number.`);
	assert(min < max, `"from" should be less than "to".`);

	return Math.random() * (max - min) + min;
}

/**
 * @type {(source: Array | string) => any}
 */
export function randomFrom(source) {
	return source[randomIndex(source)];
}

/**
 * @param {Array | string} source
 * @returns {number}
 */
export function randomIndex(source) {
	assert(source && isPositive(source.length), `"source" should be an array or a string and have a length greater than 0.`);

	return randomInteger(0, source.length);
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInteger(min, max) {
	assert(isNumberValue(min), `"from" should be a number.`);
	assert(isNumberValue(max), `"to" should be a number.`);
	assert(min < max, `"from" should be less than "to".`);

	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min)) + min;
}
