<script lang="ts">
	import ProductRows from './ProductRows.svelte';
	import CompareRows from './CompareRows.svelte';

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

			<!-- <tr>
				<th class="w-16 ">Product</th>
				{#each compareProducts as compareProduct}
					<CompareTableRow product={findProductByAsin(compareProduct["asin"])} />
				{/each}
			</tr> -->
		</tbody>
	</table>
</div>
