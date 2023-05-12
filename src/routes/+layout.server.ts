import type {LayoutServerLoad} from './$types';
import {BackendAdd} from "$lib/server/backend";

export const load = (async ({depends}) => {
	const result = {
		layoutServerNumber: BackendAdd(1),
		// Raw Data: These three lines will run in series, and take 6ms
		awaitLayoutServerDT: await timeDelay(2),
		awaitLayoutServerDT2: await timeDelay(1),
		awaitLayoutServerDT3: await timeDelay(3),
		// Promises: These three lines will run in parallel, and take 3ms,
		// but SvelteKit will resolve the promises before the page is loaded
		// so that the page will see the final data type
		// The page WILL NOT load before all of these promises are resolved
		layoutServerDT: timeDelay(2),
		layoutServerDT2: timeDelay(1),
		layoutServerDT3: timeDelay(3),
		toOverwrite: 'Top Level',
		// Deferred Promises: Everything that is in a sub-property is a deferred promise
		// The following properties will return to the layout or page as promises, not the resolved value
		// The layout or page will need to resolve these promises before displaying data
		// The page will load before these promises are resolved
		lazy: {
			layoutServerDTDelay: timeDelay(2000),
			layoutServerDTNoDelay: new Promise<string>(resolve => {resolve(new Date().toISOString());})
		}
	};

	// console.log('Server', result);

	depends('app:Server');

	return result;
}) satisfies LayoutServerLoad;

async function timeDelay(ms: number) {
	return new Promise<string>((resolve) => {
		setTimeout(() => {
			resolve(new Date().toISOString());
		}, ms);
	});
}
