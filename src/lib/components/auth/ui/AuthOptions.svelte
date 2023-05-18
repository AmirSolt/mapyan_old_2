


<script lang="ts">
	import { goto } from "$app/navigation";




    function gotoEmailAuth(){
        goto("/email-auth")
    }

</script>




<div class="my-2">


    <button class="btn variant-ringed w-full my-1" on:click={()=>0}>
        <span>with Google</span>  
        <span>(icon)</span>
    </button>

    <button class="btn variant-ringed w-full my-1" on:click={()=>1}>
        <span>with Apple</span>  
        <span>(icon)</span>
    </button>


    <button class="btn variant-ringed w-full my-1" on:click={()=>2}>
        <span>with Facebook</span>  
        <span>(icon)</span>
    </button>


    <button class="btn variant-ringed w-full my-1" on:click={gotoEmailAuth}>
        <span>with Email</span>  
        <span>(icon)</span>
    </button>



</div>

