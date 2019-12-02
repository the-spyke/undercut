import {
	close,
	asUnclosable,
	useClosable,
} from "./generator.js";

test(`makeUnclosable`, () => {
	let observer = {
		next: jest.fn(),
		return: jest.fn(),
		throw: jest.fn(),
	};

	expect(asUnclosable(observer)).toEqual(expect.objectContaining({
		next: expect.any(Function),
		throw: expect.any(Function),
		return: expect.any(Function),
	}));

	observer = {
		next: jest.fn(),
		return: jest.fn(),
		throw: jest.fn(),
	};

	const unclosable = asUnclosable(observer);

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

test(`close`, () => {
	expect(() => close()).toThrow();
	expect(() => close({})).not.toThrow();

	const observer = {
		return: jest.fn(),
	};

	close(observer);

	expect(observer.return.mock.calls).toEqual([[]]);
});

test(`useClosable`, () => {
	const closable = {
		next: jest.fn(),
		return: jest.fn(),
	};

	expect(closable.next.mock.calls).toEqual([]);
	expect(closable.return.mock.calls).toEqual([]);

	useClosable(closable, c => {
		expect(c).toBe(closable);

		c.next(123);

		expect(closable.next.mock.calls).toEqual([[123]]);
		expect(closable.return.mock.calls).toEqual([]);
	});

	expect(closable.next.mock.calls).toEqual([[123]]);
	expect(closable.return.mock.calls).toEqual([[]]);
});
