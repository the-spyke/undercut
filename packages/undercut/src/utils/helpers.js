export function identity(value) {
	return value;
}

export function noop() { }

const emptyIterable = Object.freeze({
	[Symbol.iterator]() {
		return this;
	},
	next() {
		return { value: undefined, done: true };
	},
	return() {}
});

export function peekIterable(iterable) {
	const iterator = iterable[Symbol.iterator]();
	const first = iterator.next();

	if (first.done) {
		return {
			first,
			getAll() {
				return emptyIterable;
			},
			getRest() {
				return emptyIterable;
			}
		};
	}

	return {
		first,
		getAll() {
			return (function* () {
				yield first.value;
				yield* iterator;
			})();
		},
		getRest() {
			return iterator;
		}
	}
}
