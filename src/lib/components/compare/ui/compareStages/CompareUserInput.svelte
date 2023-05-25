<script lang="ts">

    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { InputChip } from '@skeletonlabs/skeleton';

    export let isOver:boolean = false;
    export let userInput:{} = {};

    const priceVQualityProblem = "Price vs Quality:"
    const priceVQualityOptions = ["Price", "Both", "Quality"]
    const customerServiceProblem = "Is customer service important to you?"
    const customerServiceOptions = ["No", "Maybe", "Yes"]

    const inputListProblem = "List your conditions:"
    let inputList: string[] = ["Positive reviews"];

    let priceVQuality = priceVQualityOptions[1];
    let customerService = customerServiceOptions[1];
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
    <div class="flex flex-col  items-start p-2 gap-2">


        <label for={priceVQualityProblem}>{priceVQualityProblem}</label>
        <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
            {#each priceVQualityOptions as priceVQualityOption}
            <RadioItem bind:group={priceVQuality} name={priceVQualityProblem} value={priceVQualityOption}>
                {priceVQualityOption}
            </RadioItem>
            {/each}
        </RadioGroup>

        <label for={customerServiceProblem}>{customerServiceProblem}</label>
        <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
            {#each customerServiceOptions as customerServiceOption}
            <RadioItem bind:group={customerService} name={customerServiceProblem} value={customerServiceOption}>
                {customerServiceOption}
            </RadioItem>
            {/each}
        </RadioGroup>

        
        <label for={inputListProblem}>{inputListProblem} <small>(Press Enter)</small></label>
        <InputChip
        bind:value={inputList} 
        name={inputListProblem}
        maxlength={45}
        max={8}
        placeholder="Enter..." />
                
        <br>
        <button class="btn variant-filled w-full" type="submit">Submit</button>
    </div>


    
</form>