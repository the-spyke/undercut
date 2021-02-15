export function getArrayObserver(array) {
	return {
		next(value) {
			array.push(value);
		},
		return() {
			// Empty.
		},
		throw(error) {
			throw error;
		},
	};
}

export function abort(coroutine, error) {
	if (coroutine.throw) {
		coroutine.throw(error);
	}

	throw error;
}

export function asObserver(generator) {
	return function (...args) {
		const observer = generator(...args);

		observer.next();

		return observer;
	};
}

export function close(coroutine) {
	if (coroutine.return) {
		coroutine.return();
	}
}
