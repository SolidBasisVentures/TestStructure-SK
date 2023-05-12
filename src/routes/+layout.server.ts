import type {LayoutServerLoad} from './$types';
import {BackendAdd} from "$lib/server/backend";

export const load = (async ({depends}) => {
	async function timeDelay(ms: number) {
		return new Promise<string>(resolve => {
			setTimeout(() => {
				resolve(new Date().toISOString());
			}, ms);
		});
	}

	const result = {
		layoutServerNumber: BackendAdd(1),
		layoutServerDT: timeDelay(20),
		lazy: {
			layoutServerDTDelay: timeDelay(2000),
			layoutServerDTNoDelay: new Promise<string>(resolve => {resolve(new Date().toISOString());})
		}
	};

	console.log('Server', result);

	depends('app:Server');

	return result;
}) satisfies LayoutServerLoad;
