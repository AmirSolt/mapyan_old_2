<script lang="ts">
	import ProductRows from './ProductRows.svelte';
	import CompareRows from './CompareRows.svelte';
	import {CornerUpRight} from 'lucide-svelte'
	export let tableData: any[];

	function removeAllUnderscore(str: string) {
		return str.replaceAll('_', ' ');
	}
</script>

<div class="table-container">
	<table class="table table-hover table-auto">
		<tbody>
			<!-- <tr>
				<th class="w-16 ">Product</th>
				{#each compareProducts as compareProduct}
					<CompareTableRow product={findProductByAsin(compareProduct["asin"])} />
				{/each}
			</tr> -->

			<ProductRows {tableData} />

			{#each Object.keys(tableData[0].response) as key}
				<tr>
					<th class="">{removeAllUnderscore(key)}</th>
					{#each tableData as colData}
						<CompareRows {key} cellData={colData.response[key]} />
					{/each}
				</tr>
			{/each}

			<tr>
				<th class="">Link</th>
				{#each tableData as colData}
					<td class="text-center ">
						<div class="flex justify-center">
								<a class="btn variant-filled" href={colData.link} target="_blank" rel="noopener" >
									Open
									<span></span>
									<CornerUpRight size={18} strokeWidth={1} />
								</a>
						</div>
					</td>
				{/each}
			</tr>


		</tbody>
	</table>
</div>
