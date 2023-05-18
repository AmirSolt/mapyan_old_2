<script lang='ts'>
    import {page} from '$app/stores';
    $: ({session} = $page.data)

    import Modal from '$lib/components/general/ui/Modal.svelte';
    import Compare from '$lib/components/compare/ui/Compare.svelte';

    export let showPrompt: boolean = false;    

</script>

<Modal bind:showModal={showPrompt}>
    {#if showPrompt}
        {#if !session?.user}
            <button>
                Login
            </button>
        {:else}
            <Compare />
        {/if}
    {/if}
</Modal>
