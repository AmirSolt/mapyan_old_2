<script lang="ts">
	import { XCircle, CheckCircle2 } from 'lucide-svelte';
	import ProductAvatar from '$lib/components/products/ui/ProductAvatar.svelte';


	export let compareProduct: any=null;
	export let key: any=null;
	export let product: any=null;


</script>


{#if product}
	<td >
		<a class="flex justify-center " href={product.link} target="_blank" rel="noopener">
			<ProductAvatar imageUrl={product.image} />
		</a>
	</td>
{/if}

{#if compareProduct}

	{#if typeof compareProduct[key] === 'boolean'}
		{#if compareProduct[key]}
			<td class="">
				<span class="text-green-500 flex justify-center">
					<CheckCircle2 />
				</span>
			</td>
		{:else}
			<td class="">
				<span class="text-rose-500 flex justify-center">
					<XCircle />
				</span>
			</td>
		{/if}
	{:else if typeof compareProduct[key] === 'string'}

		{#if key === "title"}
			<td>
				<p class="text-center truncate ">{compareProduct[key]}</p> 
			</td>
		{:else}

		<td>
			<p class="text-center">{compareProduct[key]}</p> 
		</td>

		{/if}
	{:else if typeof compareProduct[key] === 'number'}
		<!-- <td >
			<p class="badge variant-soft text-center">

				{compareProduct[key]}
			</p>
		</td> -->

		<td>
			<p class="text-center">{compareProduct[key]}</p> 
		</td>
	
	{:else if typeof compareProduct[key] === 'undefined'}
		<td class="">
			<span class="text-rose-500 flex justify-center">
				<XCircle />
			</span>
		</td>
	{:else}
		<td>{compareProduct[key]}</td>
	{/if}


{/if}