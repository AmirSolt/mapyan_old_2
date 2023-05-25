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



        <div class="max-w-lg p-2 w-full">
            <div class="flex flex-col justify-center items-center">

                <h1 class="text-3xl">
                    Please Login
                </h1>
    
                <br>
                <a href="/options/login" class="btn variant-filled w-full">
                    Login
                </a>
                <br>
                <a href="/options/signup" class="btn variant-ringed w-full">
                    Sign-up
                </a>
    
            </div>
        </div>
        {:else}
            <Compare />
        {/if}
    </div>
</Modal>
