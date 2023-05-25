
<script lang="ts">
    export let product:any; 

    import {userAmazonDomain, productReviewsCache, selectedProducts} from '$lib/utils/stores'

    
    import StarRating from "./StarRating.svelte";

    import {NumberOfCompareProducts} from '$lib/utils/config';


    function addCompareProduct(){
        selectedProducts.update((list)=>{
            if(list.length>=NumberOfCompareProducts){
                return list;
            }

            fetchSaveReviewsAPI()

            return list.find((item) => item.asin === product.asin) ? list : [...list, product]
        })
    }




    async function fetchSaveReviewsAPI(){

	
        let response = await fetch('/api/product-reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                asin: product.asin,
                domain: $userAmazonDomain
            })
        });

        let data = await response.json();
        fetchSaveReviews(data.reviews);
    }

    function fetchSaveReviews(fetchedReviews){
        const key = `${$userAmazonDomain}/${product.asin}`
        productReviewsCache.update( (reviews)=>{
			if(fetchedReviews)
                reviews[key] = fetchedReviews

			return reviews
		})
    }

     
</script>



    {#if 
        'title' in product &&
        "rating" in product &&
        "ratings_total" in product
        }

    <div id="product_card"  class=" flex flex-col justify-between  card drop-shadow-md !bg-transparent rounded-lg p-2 md:p-4 overflow-hidden"> 


        <!-- Media -->
        <header class="flex justify-center items-center">
            <a href="{product.link}" id="media" target="_blank" rel="noopener">
                <div class="flex justify-center items-center w-40 h-44 md:w-72 md:h-74 p-2 md:p-4 rounded-lg bg-white shadow-inner shadow-gray-800/90">
                    <img class="max-w-full max-h-full" src="{product.image}" alt="Thumbnail" loading="lazy">
                </div>
            </a>
        </header>
        

        <div id="info">
        
            <br>
            <!-- brand -->
            <div id="brand" class="row">
                {#if 'brand' in product}
                <small>{product.brand}</small>
                {/if}
            </div>
            <!-- Title -->
            <div id="title" class="row">
                <a href="{product.link}" id="media" target="_blank" rel="noopener">
                    <p class="truncate " >{product.title}</p>
                </a>    
            </div>
            <!-- Ratings -->
            <div id="review" class="row flex flex-col justify-center items-start">
                <StarRating rating={product.rating} />
                <small class="mx-2">({product.ratings_total})</small>
                
            </div>
            <!-- <br> -->
            <!-- Prices -->
            <!-- check if product has prices -->
            {#if 'prices' in product && product.prices.length > 0}
                <div id="price" class="row">

                    <span class="text-2xl">
                        {product.prices[0].symbol}{product.prices[0].value}
                    </span>

                    <!-- is_prime -->
                    <!-- {#if product.prices[0].is_prime}
					<span class="text-blue-500">
						<Check />
					</span>
					{:else}
						-
					{/if} -->

                    {#if product.prices.length > 2}
                        <s>
                            {product.price[1].symbol}{product.price[1].value}
                        </s>
                    {/if}

                </div>
            {/if}

            <!-- Badges -->
            <!-- <div id="extra" class="row">
                {#if product.bestSeller || product.amazonChoice}
                    <h3>
                        Marked as {[product.bestSeller, product.amazonChoice].join("and ")}
                    </h3>
                {/if}

                {#if product.amazonPrime}
                    <h3>
                        {product.amazonPrime}
                    </h3>
                {/if}
            </div> -->

        </div>

        <footer>

            <br>

            <div class='flex justify-end items-center  w-full'>
                {#if $selectedProducts.find((item) => item.asin === product.asin) || $selectedProducts.length>=NumberOfCompareProducts}
                    <button class="btn variant-filled w-full h-10 md:w-3/4 md:h-12" type="button" on:click={addCompareProduct} disabled>
                        -
                    </button>
                {:else}
                    <button class="btn variant-filled w-full h-10 md:w-3/4 md:h-12" type="button" on:click={addCompareProduct}>
                        + Add
                    </button>
                {/if}
            </div>


        </footer>

    </div>


    {/if}
