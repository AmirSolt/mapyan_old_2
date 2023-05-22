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

	<td class="text-center">


		{#if typeof compareProduct[key] === 'boolean'}
			{#if compareProduct[key]}
					<span class="text-green-500 flex justify-center">
						<CheckCircle2 />
					</span>
			{:else}
					<span class="text-rose-500 flex justify-center">
						<XCircle />
					</span>
			{/if}
		{:else if typeof compareProduct[key] === 'string'}
	
			{#if key === "title"}
				{compareProduct[key]}
					
			{:else}
	
				{compareProduct[key]}
	
			{/if}
		{:else if typeof compareProduct[key] === 'number'}
	
			{compareProduct[key]}
	
		
		{:else if typeof compareProduct[key] === 'undefined'}
				<span class="text-rose-500 flex justify-center">
					<XCircle />
				</span>
		{:else}
			{compareProduct[key]}
		{/if}


	</td>



{/if}