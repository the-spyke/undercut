import { unwrap } from "./promise.js";
import { initializeObserver } from "./observer.js";

export function coroutine(generator) {
	return function (...args) {
		return initializeObserver(generator(...args));
	};
}

const ADDED = "ADDED";
const RUNNING = "RUNNING";
const PAUSED = "PAUSED";
const AWAITING = "AWAITING";
const FINISHED = "FINISHED";
const FAILED = "FAILED";

export class Coruntime {
	constructor() {
		this.cycle = -1;
		this.id = 0;
		this.queue = [];
		this.timeoutToken = null;
		this.states = new Map();
	}

	add(gen) {
		const state = {
			id: this.id++,
			history: [ADDED],
			context: undefined,
			hasError: false,
			...unwrap()
		};

		this.states.set(gen, state);
		this.queue.push(gen);

		return state.promise;
	}

	run() {
		this.cycle++;
		console.log(`--- Run #${this.cycle} of ${this.queue.length} steps`);
		console.log([...this.states.values()].map(s => `${s.id} --> ${s.history[s.history.length - 1]}`).join("\n"));

		if (this.timeoutToken) {
			clearTimeout(this.timeoutToken);
			this.timeoutToken = null;
		}

		const nextQueue = [];

		for (const gen of this.queue) {
			console.log(`---`);
			const state = this.states.get(gen);
			const stepId = `${this.cycle}-${state.id}`;

			try {
				console.log(`Step #${stepId}`);
				console.log(state);
				state.history.push(RUNNING);

				const { value, done } = state.hasError ? gen.throw(state.context) : gen.next(state.context);

				console.log(`Step completed for #${stepId}`);

				state.context = value;
				state.hasError = false;

				if (done) {
					console.log(`Setting #${state.id} to ${FINISHED}`);
					state.history.push(FINISHED);
					state.resolve(value);
				} else {
					if (value && value.then) {
						console.log(`Setting #${state.id} to ${AWAITING}`);
						state.history.push(AWAITING);

						value
							.then(data => {
								console.log(`>>> Promise resolved for #${state.id}, setting to ${PAUSED}`, data);
								state.history.push(PAUSED);
								state.context = data;

								this.queue.unshift(gen);
							})
							.catch(error => {
								console.log(`>>> Promise rejected for #${state.id}, setting to ${PAUSED}`, error);

								state.history.push(PAUSED);
								state.context = error;
								state.hasError = true;

								this.queue.unshift(gen);
							});
					} else {
						console.log(`Setting #${state.id} to ${PAUSED}`);
						state.history.push(PAUSED);
						nextQueue.push(gen);
					}
				}
			} catch (error) {
				console.log(`Catch for ${stepId}, setting to ${FAILED}`, error);
				state.history.push(FAILED);
				state.context = error;
				state.hasError = true;
				state.reject(error);
			}
		}

		this.queue = nextQueue;

		console.log(`--- End of run #${this.cycle}`);

		if (this.queue.length) {
			this.timeoutToken = setTimeout(() => this.run());
		}
	}
}
