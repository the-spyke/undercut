import { assert } from "./assert";
import { isNumberValue, isPositive } from "./language";

export function randomBoolean(): boolean {
	return Math.random() < 0.5;
}

export function randomDecimal(min: number, max: number): number {
	assert(isNumberValue(min), `"from" should be a number.`);
	assert(isNumberValue(max), `"to" should be a number.`);
	assert(min < max, `"from" should be less than "to".`);

	return Math.random() * (max - min) + min;
}

function randomFrom(source: string): string;
function randomFrom<T>(source: Array<T>): T;
function randomFrom<T>(source: string | Array<T>): string | T {
	return source[randomIndex(source)];
}

export { randomFrom };

export function randomIndex(source: { length: number }): number {
	assert(source && isPositive(source.length), `"source" should be an array or a string and have a length greater than 0.`);

	return randomInteger(0, source.length);
}

export function randomInteger(min: number, max: number): number {
	assert(isNumberValue(min), `"from" should be a number.`);
	assert(isNumberValue(max), `"to" should be a number.`);
	assert(min < max, `"from" should be less than "to".`);

	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min)) + min;
}
