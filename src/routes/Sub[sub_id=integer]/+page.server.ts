import type {PageServerLoad} from './$types';
import {BackendAdd} from "$lib/server/backend";

export const load = (async ({params, parent}) => {
	const parentData = await parent();
	
	const layoutServerDTDelay = await parentData.lazy.layoutServerDTDelay;
	
	console.log('lSDTD', layoutServerDTDelay);
	
	return {
		subPageServerNumber: BackendAdd(+params.sub_id)
	};
}) satisfies PageServerLoad;
