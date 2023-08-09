import {BackendAdd} from '$lib/server/backend'
import type {Actions} from '@sveltejs/kit'

export function load() {
	return {
		pageServerNumber: BackendAdd(1) as number
	}
}

const duration = 1000

async function resolvingAsync(message: string) {
	return new Promise<void>(resolve => {
		setTimeout(() => {
			console.log('Resolving', message)
			resolve()
		}, duration)
	})
}

async function rejectingAsync(message: string) {
	return new Promise<void>((resolve, reject) => {
		setTimeout(() => {
			console.log('Rejecting', message)
			if (message) {
				reject()
			} else {
				resolve()
			}
		}, duration)
	})
}

async function throwingAsync(message: string) {
	return new Promise<void>((resolve) => {
		console.log('Throwing', message)
		if (message) {
			throw new Error('Error')
		} else {
			resolve()
		}
	})
}

export const actions = {
	testErrors: async () => {
		console.log('Start')
		await resolvingAsync('Started')

		resolvingAsync('Series')
			.then(() => console.log('Series End'))

		await rejectingAsync('Series')
			.catch(() => console.log('Series Rejecting Catch'))

		throwingAsync('Series')
			.catch(() => {
				console.log('Series Throwing Catch')
			})

		await resolvingAsync('Final')
		console.log('End')
	}
} satisfies Actions
