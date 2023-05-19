
<script lang='ts'>

    import { resetPasswordRequest } from '$lib/components/auth/data/authFuncs'
    import HCaptcha from '$lib/components/auth/ui/HCaptcha.svelte';

    import {page} from '$app/stores';
    $: ({supabaseAuthClient} = $page.data)


    let showResetGuide = false

    async function resetForm(e){
        showResetGuide=true
        const form = e.target
        let formData = new FormData(form)
        let response = await resetPasswordRequest(supabaseAuthClient, formData)
    }

</script>



{#if showResetGuide}
    <div>
        <p>
            If the email you entered is associated with an account, you will receive an email with a link to reset your password.
        </p>
        <p>
            If you do not receive an email, please check your spam folder.
        </p>
    </div>

{:else}


<form on:submit|preventDefault={resetForm}>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" required>
  
    <button class="btn variant-filled" type="submit">Reset Password</button>
    <HCaptcha />
</form>


{/if}
