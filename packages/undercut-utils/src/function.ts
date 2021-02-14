export function getDoneItem<T>(value?: T) {
	return { value, done: true };
}

export function identity<T>(value: T): T {
	return value;
}

/**
 * Changes the sign of the `value`.
 */
export function negate(value: number): number {
	return -value;
}

export function noop(): void {
	// Empty.
}

/**
 * Applies logical not `!` operator to the `value`.
 */
export function not(value: unknown): boolean {
	return !value;
}

export function rethrow(error: Error): never {
	throw error;
}
