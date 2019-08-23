import { delay, unwrap } from "./promise.js";

const ADDED = "ADDED";
const RUNNING = "RUNNING";
const PAUSED = "PAUSED";
const AWAITING = "AWAITING";
const FINISHED = "FINISHED";
const FAILED = "FAILED";

class GenRuntime {
	constructor() {
		this.cycle = -1;
		this.id = 0;
		this.queue = [];
		this.token = null;
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

		if (this.token) {
			clearTimeout(this.token);
			this.token = null;
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
			this.token = setTimeout(() => this.run());
		}
	}
}

function* genAsync(a, b) {
	const result = [];

	while (a < b) {
		const x = yield delay().then(() => a);
		result.push(x);
		a++;
	}

	return result;
}

function* genSync(a, b) {
	const result = [];

	while (a < b) {
		yield;
		result.push(a);
		a++;
	}

	return result;
}

console.log(`start`);

const runtime = new GenRuntime();

Promise.all([
	runtime.add(genSync(3, 7)),
	runtime.add(genAsync(0, 1)),
	runtime.add(genSync(7, 19)),
	runtime.add(genAsync(1, 4)),
]).then(r => {
	console.log(`end`);
	console.log(r);
	console.log(runtime.states.values());
});

runtime.run();
