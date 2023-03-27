import type {PageServerLoad} from './$types';
import {BackendAdd} from "$lib/server/backend";

export const load = (async () => {
	return {
		pageServerNumber: BackendAdd(1) as number
	};
}) satisfies PageServerLoad;
