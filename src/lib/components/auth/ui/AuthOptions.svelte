


<script lang="ts">
    import { SlideToggle } from '@skeletonlabs/skeleton';
	import { goto } from "$app/navigation";


    export let isSignup:boolean = false;

    $: joinPhrase = isSignup ? 'Sign-Up':'Login';


    function gotoEmailAuth(){
        goto(`/email-auth/${joinPhrase.toLowerCase()}`)
    }

</script>

<span>Login</span>
<SlideToggle name="slide" bind:checked={isSignup} />
<span>Sign-up</span>


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

