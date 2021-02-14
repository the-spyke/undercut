export function delay(promise, time) {
	return promise.then(v => wait(time).then(() => v));
}

export function wait(time) {
	return new Promise(res => setTimeout(res, time));
}

export function unwrapPromise() {
	let resolve;
	let reject;

	const promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});

	return { promise, resolve, reject };
}
