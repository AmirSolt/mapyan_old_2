
<script lang='ts'>

    import { updatePassword } from '$lib/components/auth/data/authFuncs'

    import {page} from '$app/stores';
	import { goto } from '$app/navigation';
    $: ({supabaseAuthClient} = $page.data)


    async function updatePasswordForm(e){
        const form = e.target
        let formData = new FormData(form)
        let response = await updatePassword(supabaseAuthClient, formData)

        goto("/")
    }

</script>



<div class="flex justify-center w-full">
    <div class="max-w-2xl p-2 w-full">
        <form on:submit|preventDefault={updatePasswordForm}>
        
            <div>
                <label for="new_password">New Password</label>
                <input class=" w-full" type="password" name="new_password" id="new_password" required>
                <br>
                <label for="confirm_new_password">Confirm New Password</label>
                <input class=" w-full" type="password" name="confirm_new_password" id="confirm_new_password" required>
            </div>
          
            <br>
            <button class="btn variant-filled w-full" type="submit">Update Password</button>
        </form>
    </div>
</div>




