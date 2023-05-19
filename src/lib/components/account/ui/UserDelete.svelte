<script lang='ts'>

    import ConfirmActionModal from "$lib/components/general/ui/ConfirmActionModal.svelte";
	import { redirect } from "@sveltejs/kit";

    const confirmPrompt = "Are you sure you want to delete your account?";
    let showConfirmModal = false;

    async function deleteUser(){
        await fetch('/api/delete-user')
        redirect(302, "/api/logout")
    }

    function confirmDelete(){
        showConfirmModal=true;
    }

</script>



<h2>Delete your account</h2>
<form on:submit|preventDefault={ confirmDelete }>
    <button class="btn variant-filled" type="submit"> Delete Your Data</button>
</form>

<ConfirmActionModal bind:showModal={showConfirmModal} prompt={confirmPrompt} confirmAction={deleteUser} />