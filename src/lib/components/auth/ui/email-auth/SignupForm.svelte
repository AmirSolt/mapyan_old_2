
<script lang='ts'>
    import { signup, verifyToken } from '$lib/components/auth/data/authFuncs'
    import HCaptcha from '$lib/components/auth/ui/HCaptcha.svelte';
    let stepIndex:number = 0;
    let usedEmail:string = '';

    import {page} from '$app/stores';
	import { goto } from '$app/navigation';
    $: ({supabaseAuthClient} = $page.data)





    async function signUpForm(e){
        const form = e.target
        let formData = new FormData(form)
        usedEmail = formData.get('email')?.toString()?? ''
        let response = await signup(supabaseAuthClient, formData)
        stepIndex = 1;
    }
    async function verifyTokenForm(e) {
        const form = e.target
        const formData = new FormData(form)
        let response = await verifyToken(supabaseAuthClient, formData)

        goto('/')
    }


</script>


<div class="flex justify-center w-full">
    <div class="max-w-2xl p-2 w-full">
        {#if stepIndex==0}
        
        
            <form on:submit|preventDefault={signUpForm}>
        
                <div>
                    <label for="email">Email</label>
                    <input class="w-full" type="email" name="email" id="email" autocomplete="username" required>
                    <br>
                    <label for="password">Password</label>
                    <input class="w-full" type="password" name="password" id="password" autocomplete="new-password" required>
                </div>
                <br>
                <button class="btn variant-filled w-full" type="submit">Sign Up</button>
                
                <br>
                <br>
                <HCaptcha  />
            </form>
        
           
        
        {:else if stepIndex==1}
        
        
            <form on:submit|preventDefault={verifyTokenForm}>
                <!-- <label for="email">Email</label> -->
                <div>
                    <input class="hidden w-full" type="email" name="email" id="email" bind:value={usedEmail} >
                    <label for="token">Token</label>
                    <input class="w-full" type="text" name="token" id="token" autocomplete="off" required>
                </div>
                <br>
                <button class="btn variant-filled w-full" type="submit">Verify</button>
            </form>
        
        
        {/if}
    </div>
</div>



