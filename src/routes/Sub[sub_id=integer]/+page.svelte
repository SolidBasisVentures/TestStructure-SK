<script lang='ts'>
	import Component from '$lib/Component.svelte'
	import {deserialize, enhance} from '$app/forms'
	import {page} from '$app/stores'

	export let data

	$: console.log('Sub data - toOverwrite', data.toOverwrite)
	$: console.log('Sub $Page - toOverwrite', $page.data.toOverwrite)
	$: console.log('Sub params', $page.params.sub_id)

	async function doTest() {
		const data = new FormData()
		data.set('id', '2')

		// console.log('Test', data)

		const response = await fetch('?/testAction', {
			method: 'POST',
			body: data
		})

		/** @type {import('@sveltejs/kit').ActionResult} */
		const result = deserialize(await response.text())

		console.info('Succeeded', result)
	}
</script>

<Component {data}/>

<div>
	<form method='POST'
	      action='?/testAction'
	      use:enhance>
		<input name='id'
		       value='1'
		       type='hidden'/>
		<button>
			Form Test
		</button>
		<button type='button'
		        on:click={() => console.info('No Action')}>
			No Action
		</button>
	</form>
</div>
<div>
	<button on:click={doTest}>
		Script Test
	</button>
</div>
