import {
	initializeObserver,
} from "./observer.js";

test(`initializeObserver`, () => {
	const observer = {
		next: jest.fn()
	};

	expect(initializeObserver(observer)).toBe(observer);
	expect(observer.next.mock.calls).toEqual([[]]);
});
