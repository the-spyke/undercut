import {
	initializeObserver,
	makeUnclosable,
	tryCloseObserver,
} from "./observer.js";

test("initializeObserver", () => {
	const observer = {
		next: jest.fn()
	};

	expect(initializeObserver(observer)).toBe(observer);
	expect(observer.next.mock.calls).toEqual([[]]);
});

test("makeUnclosable", () => {
	expect(() => makeUnclosable()).toThrow();
	expect(() => makeUnclosable(1)).toThrow();
	expect(() => makeUnclosable({})).toThrow();

	let observer = {
		next: jest.fn(),
		return: jest.fn(),
		throw: jest.fn(),
	};

	expect(makeUnclosable(observer)).toEqual(expect.objectContaining({
		next: expect.any(Function),
		throw: expect.any(Function),
		return: expect.any(Function),
	}));

	observer = {
		next: jest.fn(),
		return: jest.fn(),
		throw: jest.fn(),
	};

	const unclosable = makeUnclosable(observer);

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

test("tryCloseObserver", () => {
	expect(() => tryCloseObserver()).toThrow();
	expect(() => tryCloseObserver({})).not.toThrow();

	const observer = {
		return: jest.fn(),
	};

	expect(tryCloseObserver(observer)).toBe(true);
	expect(observer.return.mock.calls).toEqual([[]]);

	expect(tryCloseObserver({})).toBe(false);
});
