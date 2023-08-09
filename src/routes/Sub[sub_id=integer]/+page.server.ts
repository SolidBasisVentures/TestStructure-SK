import type {PageServerLoad} from './$types'
import {BackendAdd} from '$lib/server/backend'
import type {Actions} from '@sveltejs/kit'

export const load = (async ({params, url, parent, depends}) => {
	depends('app:Sub')

	const parentData = await parent()

	const layoutServerDTDelay = await parentData.lazy.layoutServerDTDelay

	console.log('Foo = ', url.searchParams.get('Foo'))
	console.log('Bar = ', url.searchParams.get('Bar'))

	console.log('----------layoutServerDTDelay', layoutServerDTDelay)

	return {
		subPageServerNumber: BackendAdd(+params.sub_id),
		subPageTestData: 1,
		toOverwrite: 'Sub'
	}
}) satisfies PageServerLoad

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
