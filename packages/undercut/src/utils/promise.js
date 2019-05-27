export function delay(time) {
	return new Promise(res => setTimeout(res, time));
}

export function unwrap() {
	let resolve;
	let reject;
	let promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});

	return { promise, resolve, reject };
}
