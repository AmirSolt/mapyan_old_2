


<script lang="ts">
    import { SlideToggle } from '@skeletonlabs/skeleton';
	import { goto } from "$app/navigation";
    // import {} from 'lucide-svelte'

    export let isSignup:boolean = false;

    $: joinPhrase = isSignup ? 'Sign-Up':'Login';


    function gotoEmailAuth(){
        goto(`/email-auth/${joinPhrase.toLowerCase()}`)
    }

</script>



<div class="flex flex-col justify-center items-center">
    <div class="my-2">
        <div class="flex justify-center w-full">
            <div class="max-w-2xl p-2 w-full">


                <div class="flex justify-start items-center gap-2">
                    <span>Login</span>
                    <SlideToggle name="slide" bind:checked={isSignup} />
                    <span>Sign-up</span>
                </div>
                <br>
                <br>
        
            
                <button class="btn variant-ghost w-full my-1" on:click={()=>0}>
                    <div class="flex justify-start items-center w-full gap-8">
                        <div></div>
                        <img class="w-10 h-10" src="/google.svg" alt="Google Logo">
                        <span>{joinPhrase} with Google</span>  
                    </div>
                </button>
            
                <button class="btn variant-ghost w-full my-1" on:click={()=>1}>
                    <div class="flex justify-start items-center w-full gap-8">
                        <div></div>
                        <img class="w-10 h-10" src="/apple.svg" alt="Apple Logo">
                        <span>{joinPhrase} with Apple</span>  
                    </div>
        
                </button>
            
            
                <button class="btn variant-ghost w-full my-1" on:click={()=>2}>
                    <div class="flex justify-start items-center w-full gap-8">
                        <div></div>
                        <img class="w-10 h-10" src="/facebook.svg" alt="Facebook Logo">
                        <span>{joinPhrase} with Facebook</span>  
                    </div>
        
                </button>
            
            
                <button class="btn variant-ghost w-full my-1" on:click={gotoEmailAuth}>
                    <div class="flex justify-start items-center w-full gap-8">
                        <div></div>
                        <img class="w-10 h-10" src="/email.svg" alt="Email Icon">
                        <span>{joinPhrase} with Email</span>  
                    </div>
                </button>
            
            </div>
        </div>


    </div>
</div>    
