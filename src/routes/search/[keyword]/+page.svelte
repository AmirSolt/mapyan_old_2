<script lang="ts">
	export let data;
	$: ({ streamed, searchTerm } = data);

	import ProductSearch from '$lib/components/products/ui/ProductSearch.svelte';
	import ProductCard from '$lib/components/products/ui/ProductCard.svelte';
	import CompareBar from '$lib/components/compare/ui/CompareBar.svelte';
	import CardsPlaceHolder from '$lib/components/products/ui/CardsPlaceHolder.svelte';

</script>



<ProductSearch {searchTerm} />

<CompareBar />

<div class="my-5 w-full">
	{#await streamed.products}
			<CardsPlaceHolder />

    {:then products}
		{#if products?.length === 0}
			<h3>No products found</h3>
		{:else}
			<div class="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-3">
				{#each products ?? [] as product}
					<ProductCard {product} />	
				{/each}
			</div>
		{/if}
	{/await}
</div>