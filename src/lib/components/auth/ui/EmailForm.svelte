
<script lang='ts'>

    import { SlideToggle } from '@skeletonlabs/skeleton';
    import HCaptcha from './HCaptcha.svelte';
    let stepIndex:number = 0;
    let usedEmail:string = '';
    let isLogin:boolean = true;


    async function otpInitForm(e){
        const form = e.target
        let data = new FormData(form)
        usedEmail = data.get('email')?.toString()?? ''

        if(isLogin){
            response = await login(supabaseAuthClient, data)
        }else{
            response = await signup(supabaseAuthClient, data)
        }

        stepIndex = 1;
    }
    async function verifyTokenForm(e) {
        const form = e.target
        const data = new FormData(form)
        response = await verifyToken(supabaseAuthClient, data)

    }


</script>



{#if stepIndex==0}

    <SlideToggle name="slide" bind:checked={isLogin} />
    <form on:submit|preventDefault={otpInitForm}>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required>
        {#if isLogin}
            <button class="btn variant-filled" type="submit">Login</button>
        {:else}
            <button class="btn variant-filled" type="submit">Sign Up</button>
        {/if}
        <HCaptcha />
    </form>

    {#if isLogin}
        <a href="/email-auth/reset-password">Reset Password</a>
    {/if}



{:else if stepIndex==1}


    <form on:submit|preventDefault={verifyTokenForm}>
        <!-- <label for="email">Email</label> -->
        <input class="hidden" type="email" name="email" id="email" bind:value={usedEmail} >
        <label for="token">Token</label>
        <input type="text" name="token" id="token" required>
        <button class="btn variant-filled" type="submit">Verify</button>
    </form>


{/if}