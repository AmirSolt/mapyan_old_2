<script lang="ts">
	import { selectedProducts, userCountry } from '$lib/utils/stores';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
    import CompareTable from './compareTable/CompareTable.svelte'
    
    let compareProductsRaw: string = '';
	let remainingCredit: number = 0;
	let isLoading: boolean = true;


	import {onMount} from "svelte";

	onMount(async () => {
	    let response = await fetch(
	        '/api/compare',
	        {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify({
	                selectedProducts:$selectedProducts,
	                userCountry:$userCountry
	            })

	    })

	    let data = await response.json()

	    compareProductsRaw = data.finalResponse.content;
	    remainingCredit = data.finalCredit
	    isLoading=false

	    console.log("Compare.svelte:",data)
	});



</script>

{#if isLoading}
	<ProgressRadial width="w-12" stroke={100} />
{:else}

<div class="flex flex-col p-2">
	<br>

	<div>
		
		<h2>
			Your Remaining Credit: {remainingCredit}
		</h2>

	</div>

	<br>
	<hr>
	<br>
	
	<div>
		<CompareTable {compareProductsRaw} />

	</div>
</div>

{/if}
