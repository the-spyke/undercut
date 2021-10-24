/* eslint-disable no-new-func */

import { EOL } from "os";
import { resolve } from "path";
import { createInterface } from "readline";
import { createContext, runInContext } from "vm";

import { asObserverFactory, isObserver, isString } from "@undercut/node/utils"; // eslint-disable-line import/extensions, import/no-unresolved

export function pushFromStream(stream: NodeJS.ReadableStream, observer: unknown) {
	if (!stream) throw new Error(`"stream" is required.`);
	if (!isObserver<string>(observer)) throw new Error(`"observer" is required.`);

	const rl = createInterface({ input: stream });

	rl.on(`close`, () => observer.return?.());
	rl.on(`end`, () => observer.return?.());
	rl.on(`error`, error => observer.throw?.(error));
	rl.on(`line`, line => observer.next(line));

	return () => rl.close();
}

export const toStream = asObserverFactory(function* (/** @type {WritableStream<string>} */ stream, onEnd) {
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

function fixRelativePath(id) {
	return id.startsWith(`.`) ? resolve(id) : id;
}

async function runCore(imports, source, operations) {
	try {
		const importsPromise = Promise.all(imports.map(imp => import(imp[1])));
		const pushPromise = import(`@undercut/node/push`);

		const code = `
			((__imports, __pushFromIterable) => {
				${imports.map((imp, i) => `const ${imp[0]} = __imports[${i}];\n`).join(``)}

				__pushFromIterable([
					${operations.join(`,\n`)}
					${process.stdin.isTTY ? `${operations.length ? `,` : ``}bufferAll()` : ``}
				], ${source});
			});
		`;

		const target = toStream(process.stdout, () => process.exit(0));
		const push = await pushPromise;
		const context = createContext({
			...push,
			push,
		});
		const runPipeline = runInContext(code, context);

		runPipeline(
			await importsPromise,
			source
				? (pipeline, iterable) => push.push(target, pipeline, iterable)
				: pipeline => pushFromStream(process.stdin, push.pushLine(pipeline, target))
		);
	} catch (error) {
		console.error(error); // eslint-disable-line no-console

		process.exit(1);
	}
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

	return imports.map(parseImport).map(imp => [imp[0], fixRelativePath(imp[1])]);
}

function parseSource(source) {
	if (source) {
		if (!isString(source)) throw new Error(`"source" must be undefined or a string with an expression.`);

		return source.trim();
	}

	return undefined;
}

function parseOperations(operations: string[] = []) {
	if (!Array.isArray(operations) || !operations.every(isString)) throw new Error(`"operations" is required and must be an array of strings.`);

	return operations.map(o => o.trim()).filter(Boolean);
}

export function run(operations: string[], options: any = {}) {
	runCore(
		parseImports(options.imports),
		parseSource(options.source),
		parseOperations(operations),
	);
}
