import type {PageLoad} from './$types';
import {UniversalAdd} from "$lib/universal";

export const load = (async ({data}) => {
	return {
		...data,
		subPageUniversalNumber: UniversalAdd(data.subPageServerNumber)
	};
}) satisfies PageLoad;
