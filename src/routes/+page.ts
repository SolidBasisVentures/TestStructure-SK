import type {PageLoad} from './$types';
import {UniversalAdd} from "$lib/universal";

export const load = (async ({data}) => {
	return {
		...data,
		pageUniversalNumber: UniversalAdd(data.pageServerNumber) as number
	};
}) satisfies PageLoad;
