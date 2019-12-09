/* eslint-disable no-new-func */

import { EOL } from "os";
import { createInterface } from "readline";

import * as pull from "undercut/pull.js";
import * as push from "undercut/push.js";
import * as utils from "undercut/utils.js";

export function pushFromStdin(observer) {
	const rl = createInterface({ input: process.stdin });

	rl.on(`line`, line => observer.next(line));
	rl.on(`close`, () => observer.return());
}

export const toStdout = push.asObserver(function* () {
	const buffer = [];
	const isTTY = process.stdin.isTTY;

	let success = true;

	try {
		while (true) {
			const str = String(yield);

			if (isTTY) {
				buffer.push(str);
			} else {
				process.stdout.write(str);
				process.stdout.write(EOL);
			}
		}
	} catch (error) {
		success = false;
		throw error;
	} finally {
		if (success && isTTY) {
			for (const str of buffer) {
				process.stdout.write(str);
				process.stdout.write(EOL);
			}

			setTimeout(() => process.stdin.destroy());
		}
	}
});

export function getPipelineString(operations = []) {
	return `[${operations.map(o => `push.${o.trim()}`).join(`,`)}]`;
}

export function runPush(source, operations) {
	const pipeline = getPipelineString(operations);
	const target = toStdout();

	if (source) {
		const pushFromSource = Function(`pull`, `push`, `utils`, `target`, `
			"use strict";
			push.push(target, ${pipeline}, pull.${source.trim()});
		`);

		pushFromSource(pull, push, utils, target);
	} else {
		const getPushLine = Function(`pull`, `push`, `utils`, `target`, `
			"use strict";
			return push.pushLine(${pipeline}, target);
		`);

		pushFromStdin(getPushLine(pull, push, utils, target));
	}
}
