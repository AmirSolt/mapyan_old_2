<script lang="ts">

	import CompareTableRow from "./CompareTableRow.svelte";

	export let compareProductsRaw: string;


	function convertStringToObj(str: string) {
		let obj = JSON.parse(str);
		return obj;
	}

	function removeAllUnderscore(str: string) {
		return str.replaceAll('_', ' ');
	}

	
	
	// ==================================
	
	let compareProducts = convertStringToObj(compareProductsRaw);
	
	
	import { selectedProducts } from '$lib/utils/stores';
	function findProductByAsin(asin: string) {
		return $selectedProducts.find((product) => product.asin === asin);
	}
	
	// ==================================
	
	function caseInsensitiveLookUp(obj: { [key: string]: any }, searchKey: string): any | undefined {
		const lowercaseSearchKey = searchKey.toLowerCase();

		for (const key in obj) {
			if (obj.hasOwnProperty(key) && key.toLowerCase() === lowercaseSearchKey) {
			return obj[key];
			}
		}

		return undefined;
	}

</script>

<!-- Responsive Container (recommended) -->
<div class="table-container">
	<table class="table table-hover table-compact">
		<tbody>

			
			<tr>
				<th>Product</th>
				{#each compareProducts as compareProduct}
					<CompareTableRow product={findProductByAsin(caseInsensitiveLookUp(compareProduct,'ASIN'))} />
				{/each}
			</tr>

			{#each Object.keys(compareProducts[0]) as key}
				<tr >
					<th>{removeAllUnderscore(key)}</th>

					{#each compareProducts as compareProduct}
						<CompareTableRow {compareProduct} {key} />
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
