
<script lang="ts">
    import { ProgressRadial } from '@skeletonlabs/skeleton';

    let logoutLoading = false;


</script>



<h2>
    Logout
</h2>
<br>

<a on:click={()=>logoutLoading=true} href="/api/user/logout" class="btn variant-ringed">
    {#if !logoutLoading}
        Logout
    {:else}
        <ProgressRadial  width="w-12" stroke={100} />
    {/if}
</a>