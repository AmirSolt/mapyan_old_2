<script lang="ts">

    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { InputChip } from '@skeletonlabs/skeleton';

    export let isOver:boolean = false;
    export let userInput:{} = {};

    // const priceVQualityProblem = "Quality matters more than price:"
    // const priceVQualityOptions = ["No", "Maybe", "Yes"]
    // const customerServiceProblem = "Is customer service important to you?"
    // const customerServiceOptions = ["No", "Maybe", "Yes"]
    // let priceVQuality = priceVQualityOptions[1];
    // let customerService = customerServiceOptions[1];

    const inputListProblem = "Important features:"
    let inputList: string[] = ["Great quality for the price"];

    async function submitForm(e){
        const form = e.target
        let formData = new FormData(form)

        formData.set(inputListProblem, inputList.toString())
        for(let pair of formData.entries()){
            userInput[pair[0]] = pair[1];
        }

        isOver=true;
    }



</script>


<form on:submit|preventDefault={submitForm}>
    <div class="flex flex-col  items-start p-2 gap-6">

        <!-- <div>
            <label for={priceVQualityProblem}>{priceVQualityProblem}</label>
            <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                {#each priceVQualityOptions as priceVQualityOption}
                <RadioItem bind:group={priceVQuality} name={priceVQualityProblem} value={priceVQualityOption}>
                    {priceVQualityOption}
                </RadioItem>
                {/each}
            </RadioGroup>
        </div>

        <div>
            <label for={customerServiceProblem}>{customerServiceProblem}</label>
            <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                {#each customerServiceOptions as customerServiceOption}
                <RadioItem bind:group={customerService} name={customerServiceProblem} value={customerServiceOption}>
                    {customerServiceOption}
                </RadioItem>
                {/each}
            </RadioGroup>
        </div> -->

        <div class="flex flex-col gap-4">
            <div>
                <label for={inputListProblem}>{inputListProblem} <small>(Press Enter)</small></label>
                <InputChip
                bind:value={inputList} 
                name={inputListProblem}
                maxlength={45}
                max={8}
                placeholder="Enter..." />
            </div>
            <!-- <button class="btn variant-filled w-1/2" on:click={}>Add</button> -->
        
        </div>

                
        <br>
        <button class="btn variant-filled w-full" type="submit">Submit</button>
    </div>


    
</form>