<script lang="ts">
	import { selectedProducts, userCountry } from '$lib/utils/stores';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
    
    
    import { Table } from '@skeletonlabs/skeleton';
    import type { TableSource } from '@skeletonlabs/skeleton';
    import { tableMapperValues } from '@skeletonlabs/skeleton';

    let compareResponseRaw: string = '';
	let remainingCredit: number = 0;
	let isLoading: boolean = true;
    let tableData: TableSource;
    let selectedProduct;

	import {onMount} from "svelte";

	onMount(async () => {
	    let response = await fetch(
	        '/api/compare',
	        {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify({
	                selectedProducts:$selectedProducts,
	                userCountry:$userCountry
	            })

	    })

	    let data = await response.json()

	    compareResponseRaw = data.finalResponse.content;
	    remainingCredit = data.finalCredit
	    isLoading=false

		processResponseToTable(compareResponseRaw)

	    console.log("Compare.svelte:",data)
	});

	// compareResponse = `[{\n    \"asin\": \"B09353YZR8\",\n    \"Best camera\": true,\n    \"Best battery\": false,\n    \"Good for gaming\": false,\n    \"Expandable storage\": true,\n    \"Water resistant\": false,\n    \"What reviews loved\": \"Good quality screen size, powerful phone with interesting camera options, ample storage space with the addition of a physical memory card.\",\n    \"What reviews hated\": \"Battery life wears down quicker than previous phone, some users experienced scratches on the screen upon delivery, difficulty with unlocking the phone from T-Mobile.\"\n},\n{\n    \"asin\": \"B09Q5T4RTX\",\n    \"Best camera\": false,\n    \"Best battery\": true,\n    \"Good for gaming\": false,\n    \"Expandable storage\": false,\n    \"Water resistant\": false,\n    \"What reviews loved\": \"Triple rear camera, good quality cameras, long lasting battery.\",\n    \"What reviews hated\": \"Processing speed can be slow at times, not NFC enabled for tap-to-pay, fingerprint scanner is too small and rarely opens the phone.\"\n},\n{\n    \"asin\": \"B09X8WR3TX\",\n    \"Best camera\": false,\n    \"Best battery\": true,\n    \"Good for gaming\": false,\n    \"Expandable storage\": false,\n    \"Water resistant\": false,\n    \"What reviews loved\": \"Affordable price, good for basic needs like calling, texting, and taking photos.\",\n    \"What reviews hated\": \"Not compatible with Shaw networks, can freeze and feel warm with excessive use, some users experienced difficulty with unlocking the phone.\"\n}]`;
	// isLoading = false;
	// compareResponse = convertStringToObj(compareResponse);



    function processResponseToTable(response:string){
        let converted = convertStringToObj(response)
        // selectedProduct = converted[0].asin

        const meta_headers = ['reviews_loved', 'reviews_hated']
        const body_headers = Object.keys(converted[0]).filter((key) => !meta_headers.includes(key))

        tableData = {
            head: body_headers,
            body: tableMapperValues(converted, body_headers),
            meta: tableMapperValues(converted, meta_headers),
        };
    }

	function convertStringToObj(str: string) {
		let obj = JSON.parse(str);
		return obj;
	}

    
    function showSelectedProduct(asin){
        selectedProduct = asin
    }
    
		
				
</script>

{#if isLoading}
	<ProgressRadial width="w-12" stroke={100} />
{:else}
	<div>
		
		<small>
			Your Remaining Credit: {remainingCredit}
		</small>

		<h2>
			Click on row for more information
		</h2>

	</div>
	<Table source={tableData} interactive={true} on:selected={showSelectedProduct}/>
    
    <!-- <div>

        <h2>
            Selected Product
        </h2>

        <div>
            <h3>
                {selectedProduct}
            </h3>
           
        </div>

    </div> -->

{/if}
