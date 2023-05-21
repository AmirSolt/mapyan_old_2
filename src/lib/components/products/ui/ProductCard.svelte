
<script lang="ts">
    export let product:any; 

    
    import StarRating from "./StarRating.svelte";

    import {selectedProducts} from '$lib/utils/stores'

    import {NumberOfCompareProducts} from '$lib/utils/config';


    function addCompareProduct(){
        selectedProducts.update(
            (list)=>{
                if(list.length>=NumberOfCompareProducts){
                    return list;
                }
                return list.find((item) => item.asin === product.asin) ? list : [...list, product]
            }
        )
    }



</script>



    {#if 
        'title' in product &&
        "rating" in product &&
        "ratings_total" in product
        }

    <div id="product_card"  class=" flex flex-col justify-between  card drop-shadow-md !bg-transparent rounded-lg p-4 overflow-hidden"> 


        <!-- Media -->
        <header class="flex justify-center items-center">
            <a href="{product.link}" id="media" target="_blank" rel="noopener">
                <div class="flex justify-center items-center w-60 h-64 p-4 drop-shadow-lg rounded-lg" style="background-color:#ffffff;">
                    <img class="max-w-full max-h-full" src="{product.image}" alt="Thumbnail" loading="lazy">
                </div>
            </a>
        </header>
        

        <div id="info">
        
            <div id="brand" class="row">
                {#if 'brand' in product}
                <small>{product.brand}</small>
                {/if}
            </div>
            <br>
            <!-- Ratings -->
            <div id="review" class="row flex items-center">
                <StarRating rating={product.rating} />
                <span class="mx-2">({product.ratings_total})</span>
                
            </div>
            <!-- Title -->
            <div id="title" class="row">
                <a href="{product.link}" id="media" target="_blank" rel="noopener">
                    <p>{product.title}</p>
                </a>    
            </div>
            <br>
            <!-- Prices -->
            <!-- check if product has prices -->
            {#if 'prices' in product && product.prices.length > 0}
                <div id="price" class="row">

                    <span class="text-2xl">
                        {product.prices[0].currency} {product.prices[0].value}
                    </span>

                    {#if product.prices.length > 2}
                        <s>
                            {product.price[1].currency} {product.price[1].value}
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

            <div class='text-end w-full h-14'>
                {#if $selectedProducts.find((item) => item.asin === product.asin) || $selectedProducts.length>=NumberOfCompareProducts}
                    <button class="btn variant-filled w-1/2 h-full" type="button" on:click={addCompareProduct} disabled>
                        -
                    </button>
                {:else}
                    <button class="btn variant-filled w-1/2 h-full" type="button" on:click={addCompareProduct}>
                        + Add
                    </button>
                {/if}
            </div>


        </footer>

    </div>


    {/if}
