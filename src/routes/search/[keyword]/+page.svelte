<script lang="ts">
	export let data;
    import {userAmazonDomain, searchCache} from '$lib/utils/stores'

	$: ({ searchTerm } = data);
	let products:any[]=[];

	import ProductSearch from '$lib/components/products/ui/ProductSearch.svelte';
	import ProductCard from '$lib/components/products/ui/ProductCard.svelte';
	import CompareBar from '$lib/components/compare/ui/CompareBar.svelte';
	import CardPlaceHolder from '$lib/components/products/ui/CardPlaceHolder.svelte'


	let mounted:boolean = false;
	$: searchTerm, mounted, resetProducts(), loadFromSearchCache();

	import { onMount } from 'svelte';
	onMount(()=>{
		mounted=true;
	})


	function resetProducts(){
		products = [];
	}

	function loadFromSearchCache(){
		if(!mounted)
			return;

		const key = `${$userAmazonDomain}/${searchTerm}`
		searchCache.subscribe( (searches)=>{
			if(key in searches){
				products = searches[key]
			}else{
				fetchSearchAPI();
			}
		})
	}

	function saveToSearchCache(){
		const key = `${$userAmazonDomain}/${searchTerm}`
		searchCache.update( (searches)=>{
			if(products)
				searches[key] = products

			return searches
		})
	}


	async function fetchSearchAPI(){

	
		let response = await fetch('/api/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				searchTerm: searchTerm,
				domain: $userAmazonDomain
			})
		});

		let data = await response.json();


		products = data.products


		saveToSearchCache();
	}




</script>



<ProductSearch {searchTerm} />

<CompareBar />

<div class="my-5 w-full">


	{#if products?.length === 0}
		<div class="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-3">
			{#each Array(48) as _, i}
					<CardPlaceHolder />
			{/each}
		</div>

	{:else}

		<div class="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-3">
			{#each products ?? [] as product}
				<ProductCard {product} />	
			{/each}
		</div>

	{/if}
	
	<!-- {#await products}
	
		<div class="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-3">
		{#each Array(48) as _, i}
				<CardPlaceHolder />
		{/each}
	</div>

		
    {:then products}
		{#if products?.length === 0}
			<h3>No products found</h3>
		{:else}
			<div class="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-3">
				{#each products ?? [] as product}
					<ProductCard {product} />	
				{/each}
			</div>
		{/if}
	{/await} -->
</div>