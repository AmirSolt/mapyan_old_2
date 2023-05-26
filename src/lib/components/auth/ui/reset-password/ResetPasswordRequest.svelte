
<script lang='ts'>

    import { resetPasswordRequest } from '$lib/components/auth/data/authFuncs'
    import HCaptcha from '$lib/components/auth/ui/HCaptcha.svelte';
    import { toastStore } from '@skeletonlabs/skeleton';
    import type { ToastSettings } from '@skeletonlabs/skeleton';
    import {page} from '$app/stores';
    $: ({supabaseAuthClient} = $page.data)


    let showResetGuide = false

    async function resetForm(e){
        const form = e.target
        let formData = new FormData(form)
        
        try{
            let response = await resetPasswordRequest(supabaseAuthClient, formData)
            showResetGuide=true
        }catch(err){
            const t: ToastSettings = {
                message: err.body.message,
            };
            toastStore.trigger(t);
        }
    }

</script>


<div class="flex justify-center w-full">
    <div class="max-w-2xl p-2 w-full">
        {#if showResetGuide}

            <div class="card p-4">

                <img class="w-20 h-20" src="/email.svg" alt="Email Icon">

                <br>

                <h1 class="text-2xl">
                    Check your inbox
                </h1>

                <br>

                <p>
                    You will receive an email with a link to reset your password.
                </p>
                <p>
                    If you do not receive an email, please check your spam folder.
                </p>
            </div>
        
        {:else}
        
            <form on:submit|preventDefault={resetForm}>
                <div>
                    <label for="email">Email</label>
                    <input class="input w-full" type="email" name="email" id="email" autocomplete="username" required>
                </div>
                <br>
                <button class="btn variant-filled w-full" type="submit">Reset Password</button>
                <br>
                <br>
                <HCaptcha />
            </form>


        {/if}
    </div>
</div>



