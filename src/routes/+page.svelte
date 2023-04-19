<script lang="ts">
	import type {PageData} from "./$types";
	import {UniversalAdd} from "$lib/universal";
	
	export let data: PageData;
	
	$: svelteNumber = UniversalAdd(data.pageServerNumber + data.pageUniversalNumber);
	
	$: data.lazy.layoutServerDTDelay
		.then(res => console.log('Page Delay', res));
	
	$: setTimeout(() => {
		data.lazy.layoutServerDTNoDelay
			.then(res => console.log('Page No Delay', res));
	}, 500)

</script>

<h2>Root</h2>

<div>
	Repeat Layout Server TS Number: {data.layoutServerNumber}
</div>
<div>
	Repeat Layout Universal TS Number: {data.layoutUniversalNumber}
</div>
<div>
	Page Server TS Number: {data.pageServerNumber}
</div>
<div>
	Page Universal TS Number: {data.pageUniversalNumber}
</div>
<div>
	Page Svelte Number: {svelteNumber}
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
	<br/>
	No Delay:
	{#await data.lazy.layoutServerDTNoDelay}
		<span>...</span>
	{:then layoutServerDTNoDelay}
		<span>{layoutServerDTNoDelay}</span>
	{:catch error}
		<span>Error: {error.message}</span>
	{/await}
</div>
