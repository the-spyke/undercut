import {
	initializeObserver,
	makeObserverUnclosable,
	closeObserver,
} from "./observer.js";

test(`initializeObserver`, () => {
	const observer = {
		next: jest.fn()
	};

	expect(initializeObserver(observer)).toBe(observer);
	expect(observer.next.mock.calls).toEqual([[]]);
});

test(`makeObserverUnclosable`, () => {
	expect(() => makeObserverUnclosable()).toThrow();
	expect(() => makeObserverUnclosable(1)).toThrow();
	expect(() => makeObserverUnclosable({})).toThrow();

	let observer = {
		next: jest.fn(),
		return: jest.fn(),
		throw: jest.fn(),
	};

	expect(makeObserverUnclosable(observer)).toEqual(expect.objectContaining({
		next: expect.any(Function),
		throw: expect.any(Function),
		return: expect.any(Function),
	}));

	observer = {
		next: jest.fn(),
		return: jest.fn(),
		throw: jest.fn(),
	};

	const unclosable = makeObserverUnclosable(observer);

	unclosable.next(123);

	expect(observer.next.mock.calls).toEqual([[123]]);
	expect(observer.return.mock.calls).toEqual([]);

	unclosable.return();

	expect(observer.return.mock.calls).toEqual([]);

	unclosable.next(54);

	expect(observer.next.mock.calls).toEqual([[123], [54]]);

	expect(() => unclosable.throw()).toThrow();

	unclosable.next(28);

	expect(observer.next.mock.calls).toEqual([[123], [54], [28]]);
});

test(`closeObserver`, () => {
	expect(() => closeObserver()).toThrow();
	expect(() => closeObserver({})).not.toThrow();

	const observer = {
		return: jest.fn(),
	};

	closeObserver(observer);

	expect(observer.return.mock.calls).toEqual([[]]);
});
