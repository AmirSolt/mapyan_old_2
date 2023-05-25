<script lang="ts">

	import CompareUserInput from "./compareStages/CompareUserInput.svelte";
	import CompareResults from "./compareStages/CompareResults.svelte";

	let isUserInputOver:boolean = false;
    let userInput:{} = {};

</script>

{#if !isUserInputOver}
	<CompareUserInput bind:isOver={isUserInputOver} bind:userInput />

{:else }

	<CompareResults {userInput} />


{/if}