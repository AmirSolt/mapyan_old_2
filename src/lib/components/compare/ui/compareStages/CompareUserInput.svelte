<script lang="ts">

    export let isOver:boolean = false;
    export let userInput:{} = {};

    userInput.input = ""


</script>



<label class="label">
	<span>Textarea</span>
	<textarea bind:value={userInput.input} class="textarea" rows="4" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
</label>


<button type="button" class="btn variant-filled" on:click={()=>isOver=true}>
    Submit
</button>
