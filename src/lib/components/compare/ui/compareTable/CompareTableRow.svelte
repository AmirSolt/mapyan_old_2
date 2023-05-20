<script lang="ts">
	import { XCircle, CheckCircle2 } from 'lucide-svelte';
	import { Avatar } from '@skeletonlabs/skeleton';


	export let compareProduct: any=null;
	export let key: any=null;
	export let product: any=null;


</script>


{#if product}
	<td >
		<a class="flex justify-center" href={product.link} target="_blank" rel="noopener">
			<Avatar src={product.image} width="w-32" rounded="rounded-full" />
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
		<td>
			<p class="text-center">{compareProduct[key]}</p> 
		</td>
	{:else if typeof compareProduct[key] === 'number'}
		<td class="badge variant-filled text-center">{compareProduct[key]}</td>
	
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