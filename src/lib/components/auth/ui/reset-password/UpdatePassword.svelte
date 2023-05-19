
<script lang='ts'>

    import { updatePassword } from '$lib/components/auth/data/authFuncs'

    import {page} from '$app/stores';
    $: ({supabaseAuthClient} = $page.data)


    async function updatePasswordForm(e){
        const form = e.target
        let formData = new FormData(form)
        let response = await updatePassword(supabaseAuthClient, formData)
    }

</script>


<form on:submit|preventDefault={updatePasswordForm}>
    <label for="new_password">New Password</label>
    <input type="password" name="new_password" id="new_password" required>

    <label for="confirm_new_password">Confirm New Password</label>
    <input type="password" name="confirm_new_password" id="confirm_new_password" required>
  
    <button class="btn variant-filled" type="submit">Update Password</button>
</form>



