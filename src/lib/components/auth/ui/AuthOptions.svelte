


<script lang="ts">
    import { SlideToggle } from '@skeletonlabs/skeleton';
	import { goto } from "$app/navigation";


    let isLogin:boolean = true;

    $: joinPhrase = isLogin ? 'Login' : 'Sign-Up';


    function gotoEmailAuth(){
        goto(`/${joinPhrase}`)
    }

</script>


<SlideToggle name="slide" bind:checked={isLogin} />


<div class="my-2">


    <button class="btn variant-ringed w-full my-1" on:click={()=>0}>
        <span>{joinPhrase} with Google</span>  
        <span>(icon)</span>
    </button>

    <button class="btn variant-ringed w-full my-1" on:click={()=>1}>
        <span>{joinPhrase} with Apple</span>  
        <span>(icon)</span>
    </button>


    <button class="btn variant-ringed w-full my-1" on:click={()=>2}>
        <span>{joinPhrase} with Facebook</span>  
        <span>(icon)</span>
    </button>


    <button class="btn variant-ringed w-full my-1" on:click={gotoEmailAuth}>
        <span>{joinPhrase} with Email</span>  
        <span>(icon)</span>
    </button>



</div>

