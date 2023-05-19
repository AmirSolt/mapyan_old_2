
<script lang="ts">
    import { ProgressRadial } from '@skeletonlabs/skeleton';

    let logoutLoading = false;


</script>



Account




<a on:click={()=>logoutLoading=true} href="/logout" class="btn variant-filled">
    {#if !logoutLoading}
        Logout
    {:else}
        <ProgressRadial  width="w-12" stroke={100} />
    {/if}
</a>