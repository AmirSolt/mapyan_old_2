
<script lang="ts">
    import {Search} from 'lucide-svelte'
    import {goto} from '$app/navigation';
    import {userCountry} from '$lib/utils/stores'
    

    
    export let searchTerm = '';
    let searchInput = searchTerm
  
    function searchForm(keyword:string, country:string) {
        goto(`/search/${keyword}?country=${country}`)
    }

</script>






<div class="my-5" >
    <form class="flex w-full h-14 justify-center"  on:submit|preventDefault={()=>searchForm(searchInput, $userCountry)}>
        <div class="input-group input-group-divider grid-cols-[1fr_auto] variant-ringed ">
            <input type="text" placeholder="Search..." bind:value={searchInput} autocomplete="off" />
            <button class="variant-filled-primary"><Search /></button>
        </div>
    </form>
</div>    

