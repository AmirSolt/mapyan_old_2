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
	
	function getParameterCaseInsensitive(object, key) {
		const asLowercase = key.toLowerCase();
		return object[Object.keys(object)
			.find(k => k.toLowerCase() === asLowercase)
		];
	}

</script>

<!-- Responsive Container (recommended) -->
<div class="table-container ">
	<table class="table table-hover table-fixed">
		<tbody>

			
			<tr>
				<th>Product</th>
				{#each compareProducts as compareProduct}
					<CompareTableRow product={findProductByAsin(getParameterCaseInsensitive(compareProduct,'asin'))} />
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
