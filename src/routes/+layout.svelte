<script lang='ts'>
	import {UniversalAdd} from '$lib/universal'
	import {invalidate, invalidateAll} from '$app/navigation'
	import {browser} from '$app/environment'

	export let data

	$: svelteNumber = UniversalAdd(data.layoutServerNumber + data.layoutUniversalNumber)

	async function doInvalidateAll() {
		await invalidateAll()
	}

	async function doInvalidateServer() {
		await invalidate('app:Server')
	}

	async function doInvalidateUniversal() {
		await invalidate('app:Universal')
	}

	async function doReload() {
		if (browser) {
			window.location.reload()
		}
	}

	let svelteDT = new Date().toISOString()

	let layoutServerDTDelay: Awaited<typeof data.lazy.layoutServerDTDelay>

	$: data.lazy.layoutServerDTDelay
	       .then(res => layoutServerDTDelay = res)

	$: console.log('DTDelay', layoutServerDTDelay)

</script>

<h1>
	Layout
</h1>

<div>
	Layout Server TS Number: {data.layoutServerNumber}
</div>
<div>
	Layout Universal TS Number: {data.layoutUniversalNumber}
</div>
<div>
	Layout Svelte Number: {svelteNumber}
</div>
<div>
	Layout Server DateTime: {data.layoutServerDT}
</div>
<div>
	Layout Server DateTime Delay:
	{#await data.lazy.layoutServerDTDelay}
		<span>...</span>
	{:then layoutServerDTDelay}
		<span>{layoutServerDTDelay}</span>
	{:catch error}
		<span>Error: {error.message}</span>
	{/await}
</div>
<div>
	Layout Universal DateTime: {data.layoutUniversalDT}
</div>
<div>
	Layout Svelte DateTime: {svelteDT}
</div>

<div>
	<button on:click={doInvalidateAll}>
		Invalidate All
	</button>
</div>

<div>
	<button on:click={doInvalidateServer}>
		Invalidate Server
	</button>
</div>

<div>
	<button on:click={doInvalidateUniversal}>
		Invalidate Universal
	</button>
</div>

<div>
	<button on:click={doReload}>
		Reload
	</button>
</div>

<div>
	<a href='/'>Root</a>
</div>
<div>
	<a href='/Sub1'>Sub 1</a>
</div>
<div>
	<a href='/Sub2'>Sub 2</a>
</div>

<slot/>
