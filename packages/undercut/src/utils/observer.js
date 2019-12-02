export {
	close as closeObserver,
	useClosable as useObserver
} from "./generator.js";

export function initializeObserver(oberver) {
	oberver.next();

	return oberver;
}
