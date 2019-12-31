/* eslint-disable no-new-func */

import { EOL } from "os";
import { resolve } from "path";
import { createInterface } from "readline";

import * as pull from "@undercut/node-10/pull";
import * as push from "@undercut/node-10/push";
import { asObserver, isObserver, isPlainObject, isString } from "@undercut/node-10/utils";

/**
 * @param {ReadableStream<string>} stream
 * @param {Observer} observer
 */
export function pushFromStream(stream, observer) {
	if (!stream) throw new Error(`"stream" is required.`);
	if (!isObserver(observer)) throw new Error(`"observer" is required.`);

	const rl = createInterface({ input: stream });

	rl.on(`close`, () => observer.return());
	rl.on(`end`, () => observer.return());
	rl.on(`error`, error => observer.throw(error));
	rl.on(`line`, line => observer.next(line));

	return () => rl.close();
}

export const toStream = asObserver(function* (/** @type {WritableStream<string>} */ stream, onEnd) {
	let success = true;

	try {
		while (true) {
			const str = String(yield);

			stream.write(str);
			stream.write(EOL);
		}
	} catch (error) {
		success = false;
		stream.abort(error);
		throw error;
	} finally {
		if (success) {
			stream.end();
			onEnd && onEnd();
		}
	}
});

function extractDefaultExport(exp) {
	if (
		typeof require === `undefined` &&
		isPlainObject(exp) &&
		`default` in exp &&
		Object.getOwnPropertyNames(exp).length === 1
	) {
		return exp.default;
	}

	return exp;
}

function isFromContext(expr, context) {
	const match = expr.match(/^(\w+)\(/i);

	if (match) {
		return match[1] in context;
	}

	return false;
}

function buildConstants(expressions) {
	return expressions.map((expr, index) => `  const ${expr} = __imports[${index}];`).join(`\n`);
}

function buildGetSource(constants, source) {
	return new Function(`__imports`, `
		"use strict";
		${constants}
		return ${isFromContext(source, pull) ? `pull.` : ``}${source};
	`);
}

function buildGetPipeline(constants, operations) {
	return new Function(`__imports`, `
		"use strict";
		${constants}
		return [
			${operations.map(o => isFromContext(o, push) ? `push.${o}` : o).join(`,\n`)}
		];
	`);
}

function fixRelativePath(id) {
	return id.startsWith(`.`) ? resolve(id) : id;
}

function runCore(imports, source, operations) {
	const constants = buildConstants(imports.map(entry => entry[0]));
	const getPipeline = buildGetPipeline(constants, operations);
	const getSource = source && buildGetSource(constants, source);
	const target = toStream(process.stdout, () => process.exit(0));

	Promise.all(imports.map(entry => import(fixRelativePath(entry[1]))))
		.then(imports => imports.map(extractDefaultExport))
		.then(imports => {
			const pipeline = getPipeline(imports);

			if (process.stdin.isTTY) {
				pipeline.push(push.bufferAll());
			}

			const observer = push.pushLine(pipeline, target);

			if (getSource) {
				const iterable = getSource(imports);

				pull.toObserver(observer)(iterable);
			} else {
				pushFromStream(process.stdin, observer);
			}
		})
		.catch(error => {
			console.error(error); // eslint-disable-line no-console

			process.exit(1);
		});
}

export function parseImport(str) {
	if (!str) throw new Error(`Unknown import format: <empty>`);

	const parts = str.split(`::`);

	if (parts.length > 2) throw new Error(`Unknown import format: ${str}`);

	if (parts.length === 2) {
		if (parts[0].length < 1) throw new Error(`Missing import name: ${str}`);
		if (parts[1].length < 1) throw new Error(`Missing import id: ${str}`);

		return parts;
	}

	const id = parts[0];

	if (/^\w/i.test(id)) {
		return [id, id];
	}

	throw new Error(`Missing import name: ${str}`);
}

function parseImports(imports = []) {
	if (!Array.isArray(imports) || !imports.every(isString)) throw new Error(`"imports" must be undefined or an array of strings.`);

	return [
		[`pull`, `@undercut/node-10/pull`],
		[`push`, `@undercut/node-10/push`],
		[`utils`, `@undercut/node-10/utils`],
		...imports.map(parseImport),
	];
}

function parseSource(source) {
	if (source) {
		if (!isString(source)) throw new Error(`"source" must be undefined or a string with an expression.`);

		return source.trim();
	}

	return undefined;
}

function parseOperations(operations = []) {
	if (!Array.isArray(operations) || !operations.every(isString)) throw new Error(`"operations" is required and must be an array of strings.`);

	return operations.map(o => o.trim()).filter(Boolean);
}

/**
 * @param {string[]} imports
 * @param {string} source
 * @param {string[]} operations
 * @returns {void}
*/
export function run(imports, source, operations) {
	runCore(
		parseImports(imports),
		parseSource(source),
		parseOperations(operations),
	);
}
