
<script lang='ts'>

    import { resetPasswordRequest } from '$lib/components/auth/data/authFuncs'
    import HCaptcha from '$lib/components/auth/ui/HCaptcha.svelte';

    import {page} from '$app/stores';
    $: ({supabaseAuthClient} = $page.data)


    async function resetForm(e){
        const form = e.target
        let formData = new FormData(form)

        let response = await resetPasswordRequest(supabaseAuthClient, formData)

    }

</script>


<form on:submit|preventDefault={resetForm}>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" required>
  
    <button class="btn variant-filled" type="submit">Reset Password</button>
    <HCaptcha />
</form>



