<script lang='ts'>
	import Component from './Component.svelte'
	import {deserialize, enhance} from '$app/forms'

	async function doTest() {

		const data = new FormData()
		data.set('id', '2')

		console.log('Test', data)

		const response = await fetch('?/testAction', {
			method: 'POST',
			body: data
		})

		/** @type {import('@sveltejs/kit').ActionResult} */
		const result = deserialize(await response.text())

		console.log('Succeeded', result)
	}
</script>

<Component/>
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
	</form>
</div>
<div>
	<button on:click={doTest}>
		Script Test
	</button>
</div>
