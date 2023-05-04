import type {PageServerLoadEvent} from './$types'
import {BackendAdd} from '$lib/server/backend'

export async function load(e: PageServerLoadEvent) {
	const parentData = await e.parent()

	const layoutServerDTDelay = await parentData.lazy.layoutServerDTDelay

	console.log('lSDTD', layoutServerDTDelay)

	return {
		subPageServerNumber: BackendAdd(+e.params.sub_id)
	}
}
