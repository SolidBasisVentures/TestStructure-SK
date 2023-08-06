import type {PageServerLoadEvent} from './$types'
import {BackendAdd} from '$lib/server/backend'
import type {Actions} from '@sveltejs/kit'

export async function load(e: PageServerLoadEvent) {
	const parentData = await e.parent()

	const layoutServerDTDelay = await parentData.lazy.layoutServerDTDelay

	console.log('Foo = ', e.url.searchParams.get('Foo'))
	console.log('Bar = ', e.url.searchParams.get('Bar'))

	console.log('----------layoutServerDTDelay', layoutServerDTDelay)

	return {
		subPageServerNumber: BackendAdd(+e.params.sub_id)
	}
}

export const actions: Actions = {
	testAction: async ({request, url}) => {
		if (url.searchParams.get('Foo')) {
			console.log('Foo = ', url.searchParams.get('Foo'))
		}
		if (url.searchParams.get('Bar')) {
			console.log('Bar = ', url.searchParams.get('Bar'))
		}
		console.log('++++++++++++testAction FormData', await request.formData())

		return {success: true, message: 'Test Executed'}
	}
}
