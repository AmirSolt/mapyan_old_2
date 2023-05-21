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
            <div class="flex flex-col w-1/2 ">

                <a href="/options/login" class="btn variant-filled m-4">
                    Login
                </a>
                <a href="/options/signup" class="btn variant-ringed m-4">
                    Sign-up
                </a>
            </div>
        {:else}
            <Compare />
        {/if}
    </div>
</Modal>
