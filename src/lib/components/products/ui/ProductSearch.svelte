
<script lang="ts">
    import {Search} from 'lucide-svelte'
    import {goto} from '$app/navigation';
    

    
    export let searchTerm = '';
    let searchInput = searchTerm
  
    function searchForm(keyword:string) {
        if(keyword.length===0)
            return;
        goto(`/search/${keyword}`)
    }

</script>






<div class="my-5" >
    <form class="flex w-full h-14 justify-center"  on:submit|preventDefault={()=>searchForm(searchInput)}>
        <div class="input-group  max-w-2xl input-group-divider grid-cols-[1fr_auto] variant-ringed ">
            <input class="ps-6 text-xl" type="text" placeholder="Search..." bind:value={searchInput} autocomplete="off" />
            <button class="variant-filled-primary"><Search color={"#f9f9f9"} /></button>
        </div>
    </form>
</div>    

