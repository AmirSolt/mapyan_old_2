<script lang='ts'>
    import {page} from '$app/stores';
    $: ({session} = $page.data)

    import Modal from '$lib/components/general/ui/Modal.svelte';
    import Compare from '$lib/components/compare/ui/Compare.svelte';

    export let showPrompt: boolean = false;    

</script>

<Modal bind:showModal={showPrompt}>
    {#if !session?.user}
        <a href="/auth" class="btn variant-filled">
            Login
        </a>
    {:else}
        <Compare />
    {/if}
</Modal>
