import type {PageServerLoad} from './$types'
import {BackendAdd} from '$lib/server/backend'
import type {Actions} from '@sveltejs/kit'

export const load = (async ({params, depends}) => {
	depends('app:Sub')

	return {
		subPageServerNumber: BackendAdd(+params.sub_id),
		subPageTestData: 1,
		toOverwrite: 'Sub'
	}
}) satisfies PageServerLoad

export const actions: Actions = {
	testAction: async (e) => {
		console.log('testAction FormData', await e.request.formData())

		return {success: true, message: 'Test Executed'}
	}
}
