<script lang='ts'>

    import ConfirmActionModal from "$lib/components/general/ui/ConfirmActionModal.svelte";
    import { toastStore } from '@skeletonlabs/skeleton';
    import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
    const confirmPrompt = "Are you sure you want to delete your account?";
    let showConfirmModal = false;

    async function deleteUser(){
        

        try{
            await fetch('/api/user/delete-user')
            goto("/api/user/logout")
        }catch(err){
            const t: ToastSettings = {
                message: err.body.message,
            };
            toastStore.trigger(t);
        }
    }

    function confirmDelete(){
        showConfirmModal=true;
    }

</script>






<h2>Delete your account</h2>
<br>
<form on:submit|preventDefault={ confirmDelete }>
    <button class="btn variant-filled-error" type="submit"> Delete Your Data</button>
</form>

<ConfirmActionModal bind:showModal={showConfirmModal} prompt={confirmPrompt} confirmAction={deleteUser} />