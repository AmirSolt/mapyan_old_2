
<script lang='ts'>
    import { toastStore } from '@skeletonlabs/skeleton';
    import type { ToastSettings } from '@skeletonlabs/skeleton';

    import {page} from '$app/stores';
	import { goto } from '$app/navigation';


    async function updatePasswordForm(e){
        const form = e.target
        let formData = new FormData(form)

        

        let response = await fetch('/api/user/update-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newPassowrd: formData.get("new_password"),
                confirmNewPassowrd: formData.get("confirm_new_password"),
            })
        });

        if(response.ok){
            goto("/api/user/logout")
        }else{
            let err = await response.json()
            const t: ToastSettings = {
            message: err.message,
            };
            toastStore.trigger(t);
        }
  
    }

</script>



<div class="flex justify-center w-full">
    <div class="max-w-2xl p-2 w-full">
        <form on:submit|preventDefault={updatePasswordForm}>
        
            <div>
                <label for="new_password">New Password</label>
                <input class="input w-full" type="password" name="new_password" id="new_password" autocomplete="new-password" required>
                <br>
                <label for="confirm_new_password">Confirm New Password</label>
                <input class="input w-full" type="password" name="confirm_new_password" id="confirm_new_password" autocomplete="new-password" required>
            </div>
          
            <br>
            <button class="btn variant-filled w-full" type="submit">Update Password</button>
        </form>
    </div>
</div>




