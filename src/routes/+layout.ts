import type {LayoutLoad} from './$types';
import {UniversalAdd} from "$lib/universal";

export const load = (async ({data, depends}) => {
	const result = {
		...data,
		layoutUniversalNumber: UniversalAdd(data.layoutServerNumber) as number,
		layoutUniversalDT: new Date().toISOString()
	}

	console.log('Universal', result)

	depends('app:Universal')

	return result;
}) satisfies LayoutLoad;
