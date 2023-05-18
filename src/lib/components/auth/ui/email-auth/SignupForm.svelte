
<script lang='ts'>
    import { signup, verifyToken } from '../data/authFuncs'
    import HCaptcha from './HCaptcha.svelte';
    let stepIndex:number = 0;
    let usedEmail:string = '';

    import {page} from '$app/stores';
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

    }


</script>



{#if stepIndex==0}

    <form on:submit|preventDefault={signUpForm}>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required>
        <button class="btn variant-filled" type="submit">Sign Up</button>
        <HCaptcha />
    </form>

   

{:else if stepIndex==1}


    <form on:submit|preventDefault={verifyTokenForm}>
        <!-- <label for="email">Email</label> -->
        <input class="hidden" type="email" name="email" id="email" bind:value={usedEmail} >
        <label for="token">Token</label>
        <input type="text" name="token" id="token" required>
        <button class="btn variant-filled" type="submit">Verify</button>
    </form>


{/if}