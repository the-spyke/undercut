import { noop } from "./function";

export function delay<T>(promise: Promise<T>, time?: number): Promise<T> {
	return promise.then(v => wait(time).then(() => v));
}

export function wait(time?: number): Promise<void> {
	return new Promise(res => {
		setTimeout(res, time);
	});
}

export function unwrapPromise<T>() {
	let resolve: (value: T) => void = noop;
	let reject: (reason?: unknown) => void = noop;

	const promise = new Promise<T>((res, rej) => {
		resolve = res;
		reject = rej;
	});

	return { promise, resolve, reject };
}
