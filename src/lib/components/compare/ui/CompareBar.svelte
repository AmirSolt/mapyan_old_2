<script lang="ts">
	import { X } from 'lucide-svelte';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import ProductAvatar from '$lib/components/products/ui/ProductAvatar.svelte';
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



<div class="sticky top-0 z-10" >

	<div class="variant-soft rounded-lg">
		<ProgressBar rounded="rounded-t-lg" class="rounded-none" meter="bg-primary-500" height="h-2" value={progressValue} />
	</div>
	
	
	<div class="card variant-soft backdrop-blur-md p-2 md:p-4 rounded-t-none  flex flex-row justify-between items-center md:px-24">
		



		<div class="">


			<div class="flex justify-center items-center h-16 md:h-20">

				{#each $selectedProducts as product}
					<button
						id="compare-button"
						type="button"
						class="relative m-2 md:m-4"
						on:click={() => removeCompareProduct(product)}
					>
						<!-- <img class="max-w-full max-h-full rounded-lg" src="{product.image}" alt="Thumbnail"> -->
						<ProductAvatar imageUrl={product.image} />
						<div class="absolute z-10 right-0 top-0 variant-filled rounded-full drop-shadow-2xl">
							<span>
								<X />
							</span>
						</div>
					</button>
				{/each}
			</div>

		</div>
	
	
	
		<div class="w-1/4">
			{#if $selectedProducts.length > 0}
				<button class="btn variant-filled-primary w-full" type="button" on:click={openCompareModal}>
					Compare	
				</button>
			{:else}
				<button class="btn variant-ringed w-full" type="button" disabled> - </button>
			{/if}
		</div>
	
		
	
	</div>


</div>


<CompareModal bind:showPrompt />
