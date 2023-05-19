<script lang='ts'>
    import {page} from '$app/stores';
    $: ({session} = $page.data)

    import Modal from '$lib/components/general/ui/Modal.svelte';
    import Compare from '$lib/components/compare/ui/Compare.svelte';

    export let showPrompt: boolean = false;    

</script>

<Modal bind:showModal={showPrompt}>
    <div class="flex justify-center items-center h-full w-full">

        {#if !session?.user}
            <a href="/options/login" class="btn variant-filled">
                Login
            </a>
    
            <a href="/options/signup" class="btn variant-ringed">
                Sign-up
            </a>
        {:else}
            <Compare />
        {/if}
    </div>
</Modal>
