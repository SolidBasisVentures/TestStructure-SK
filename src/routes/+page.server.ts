import {BackendAdd} from '$lib/server/backend'

export function load() {
	return {
		pageServerNumber: BackendAdd(1) as number
	}
}
