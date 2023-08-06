<script lang="ts">
	import {UniversalAdd} from "$lib/universal";
	import {page} from "$app/stores";
	import {goto} from '$app/navigation'

	$: svelteNumber = UniversalAdd($page.data.subPageServerNumber + $page.data.subPageUniversalNumber);

	$: $page.data.lazy.layoutServerDTDelay
		.then(res => console.log('Component', res))

	let inputFoo: HTMLInputElement

	function doWriteFoo() {
		const url = new URL($page.url)
		if (inputFoo.value) {
			url.searchParams.set('Foo', inputFoo.value)
		} else {
			url.searchParams.delete('Foo')
		}
		goto(url.href, {replaceState: true})
	}

	let inputBar: HTMLInputElement

	function doWriteBar() {
		const url = new URL($page.url)
		if (inputBar.value) {
			url.searchParams.set('Bar', inputBar.value ?? '')
		} else {
			url.searchParams.delete('Bar')
		}
		goto(url.href, {replaceState: true})
	}
</script>

<h2>Sub {$page.params.sub_id} Component</h2>

<div>
	Repeat Layout Server TS Number: {$page.data.layoutServerNumber}
</div>
<div>
	Repeat Layout Universal TS Number: {$page.data.layoutUniversalNumber}
</div>
<div>
	Page Server TS Number: {$page.data.subPageServerNumber}
</div>
<div>
	Page Universal TS Number: {$page.data.subPageUniversalNumber}
</div>
<div>
	Page Svelte Number: {svelteNumber}
</div>
<div>
	Layout Server DateTime Delay:
	{#await $page.data.lazy.layoutServerDTDelay}
		<span>...</span>
	{:then layoutServerDTDelay}
		<span>{layoutServerDTDelay}</span>
	{:catch error}
		<span>Error: {error.message}</span>
	{/await}
</div>
<h1>Params</h1>
<div>
	Foo: {$page.url.searchParams.get('Foo')}
</div>
<div>
	<input type='text'
	       value={$page.url.searchParams.get('Foo') ?? ''}
	       bind:this={inputFoo}/>
	       <button type='button' on:click={doWriteFoo}>
		       Write Foo
	       </button>
</div>
<div>
	Bar: {$page.url.searchParams.get('Bar')}
</div>
<div>
	<input type='text'
	       value={$page.url.searchParams.get('Bar') ?? ''}
	       bind:this={inputBar}/>
	       <button type='button' on:click={doWriteBar}>
		       Write Bar
	       </button>
</div>
