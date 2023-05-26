<script lang="ts">


    import { selectedProducts, productReviewsCache } from '$lib/utils/stores';
	import CompareTable from '../compareTable/CompareTable.svelte'
	import CompareLoading from './CompareLoading.svelte';


	export let userInput:{} = {};


	console.log("selectedProducts:",$selectedProducts,)
	console.log("productReviewsCache:",$productReviewsCache,)


    let tableData: any[]=[];
	let remainingCredit: number = 0;
	let isLoading: boolean = true;


	function checkInputProductsFetched(){
		if(Object.keys($productReviewsCache).length < $selectedProducts.length ) {
			window.setTimeout(checkInputProductsFetched, 100);
		} else {
			getAIResponse();
		}
	}



    async function getAIResponse() {
		let response = await fetch('/api/products/compare', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				selectedProducts: $selectedProducts,
				inputProducts: $productReviewsCache,
				userInput: userInput
			})
		});

		let data = await response.json();

		tableData = data.tableData;
		remainingCredit = data.finalCredit;
		isLoading = false;

		console.log('Compare.svelte:', data);
	}


    import { onMount } from 'svelte';
	onMount(()=>{

        checkInputProductsFetched();

	})

</script>




{#if isLoading}


    <CompareLoading  />

{:else}
	
    <div class="flex flex-col p-2 h-full w-full">
        <br />
        <div>
            <h2>
                Credits: {remainingCredit}
            </h2>

            <p class="text-sm">*This information has been generated with the help AI, and has not been confirmed by a human.</p>
        </div>
        <br />
        <hr />
        <br />
        <div>
            <CompareTable {tableData} />
        </div>
    </div>
{/if}

