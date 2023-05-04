import type {PageServerLoadEvent} from './$types'
import {BackendAdd} from '$lib/server/backend'
import type {Actions} from '@sveltejs/kit'

export async function load(e: PageServerLoadEvent) {
	const parentData = await e.parent()

	const layoutServerDTDelay = await parentData.lazy.layoutServerDTDelay

	console.log('layoutServerDTDelay', layoutServerDTDelay)

	return {
		subPageServerNumber: BackendAdd(+e.params.sub_id)
	}
}

export const actions: Actions = {
	testAction: async (e) => {
		console.log('testAction FormData', await e.request.formData())

		return {success: true, message: 'Test Executed'}
	}
}
