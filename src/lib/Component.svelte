<script lang="ts">
	import {UniversalAdd} from "$lib/universal";
	import {page} from "$app/stores";

	export let data

	$: svelteNumber = UniversalAdd($page.data.subPageServerNumber + $page.data.subPageUniversalNumber);

	$: console.log('Component data - toOverwrite', data?.toOverwrite)
	$: console.log('Component $Page - toOverwrite', $page.data.toOverwrite)
	$: console.log('Component params', $page.params.sub_id)

	/* $: $page.data.lazy.layoutServerDTDelay
		.then(res => console.log('Component', res)) */
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
