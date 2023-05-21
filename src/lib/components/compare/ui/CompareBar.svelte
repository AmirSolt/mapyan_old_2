<script lang="ts">
	import { X } from 'lucide-svelte';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import CompareModal from './CompareModal.svelte';
	let showPrompt: boolean = false;

	import { selectedProducts } from '$lib/utils/stores';
	function removeCompareProduct(product) {
		selectedProducts.update((list) => list.filter((item) => item.asin !== product.asin));
	}

	$: progressValue = ($selectedProducts.length / 3) * 100;

	function openCompareModal() {
		showPrompt = true;
	}
</script>



<div>

	<div class="variant-soft">
		<ProgressBar rounded="rounded-t-lg" class="rounded-none" meter="bg-primary-500" height="h-4" value={progressValue} />
	</div>
	
	
	<div class="flex justify-between items-center p-2 card drop-shadow-md rounded-b-lg">
		
		<div class="h-32">
			{#each $selectedProducts as product}
				<button
					id="compare-button"
					type="button"
					class="relative w-32 h-32 p-0 btn m-2"
					on:click={() => removeCompareProduct(product)}
				>
					<!-- <img class="max-w-full max-h-full rounded-lg" src="{product.image}" alt="Thumbnail"> -->
					<Avatar src={product.image} width="w-32" rounded="rounded-full" />
					<div class="absolute z-10 right-0 top-0 variant-filled rounded-full drop-shadow-2xl">
						<span>
							<X />
						</span>
					</div>
				</button>
			{/each}
		</div>
	
	
		
	
		<div class="me-3">
			{#if $selectedProducts.length > 0}
				<button class="btn variant-filled-primary h-16 w-60" type="button" on:click={openCompareModal}>
					Compare	
				</button>
			{:else}
				<button class="btn variant-ringed h-16 w-60" type="button" disabled> - </button>
			{/if}
		</div>
	
		
	
	</div>


</div>


<CompareModal bind:showPrompt />
