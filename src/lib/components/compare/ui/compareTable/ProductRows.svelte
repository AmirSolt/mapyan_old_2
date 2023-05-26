<script lang="ts">
	import ProductAvatar from '$lib/components/products/ui/ProductAvatar.svelte';
	import StarRating from '$lib/components/products/ui/StarRating.svelte';
	import {CornerUpRight} from 'lucide-svelte'

	export let tableData: any[] = [];


	function truncate(text:string, size:number){
		return text.substring(0,size) + " ...";
	}

</script>

<tr>
	<th class="">Product</th>
	{#each tableData as colData}
		<td class="text-center">
			<a class="flex justify-center" href={colData.link} target="_blank" rel="noopener">
				<ProductAvatar imageUrl={colData.image} />
			</a>
		</td>
	{/each}
</tr>


<tr>
	<th class="">Title</th>
	{#each tableData as colData}
		<td class="text-center">
			<a class="flex justify-center" href={colData.link} target="_blank" rel="noopener">
				<span>
					{truncate(colData.title, 15)}
				</span>
			</a>
		</td>
	{/each}
</tr>

<tr>
	<th class="">Ratings</th>
	{#each tableData as colData}
		<td class="text-center">
			<div class="row flex flex-col justify-center items-center">
				<StarRating rating={colData.rating} />
				<small class="mx-2">({colData.ratings_total})</small>
			</div>
		</td>
	{/each}
</tr>

<tr>
	<th class="">Price</th>
	{#each tableData as colData}
		<td class="text-center">
			<div class="">
				<span>
					{colData.price_raw}
				</span>
			</div>
		</td>
	{/each}
</tr>



<!-- <tr>
	<th class="">Prime</th>
	{#each tableData as colData}
		<td class="text-center ">
			<div class="flex justify-center">
					{#if colData.is_prime}
					<span class="text-blue-500">
						<Check />
					</span>
					{:else}
						-
					{/if}
			</div>
		</td>
	{/each}
</tr> -->
