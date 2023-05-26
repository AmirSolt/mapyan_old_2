<script lang='ts'>

    import ConfirmActionModal from "$lib/components/general/ui/ConfirmActionModal.svelte";
	import { redirect } from "@sveltejs/kit";

    const confirmPrompt = "Are you sure you want to delete your account?";
    let showConfirmModal = false;
    let showDeleteGuide = false;

    async function deleteUser(){
        await fetch('/api/user/delete-user')
    }

    function confirmDelete(){
        showConfirmModal=true;
        showDeleteGuide = true;
    }

</script>




{#if showDeleteGuide}

<p class="text-rose-600">
    To complete the deletion, please logout.
</p>
<br>
{/if}

<h2>Delete your account</h2>
<br>
<form on:submit|preventDefault={ confirmDelete }>
    <button class="btn variant-filled-error" type="submit"> Delete Your Data</button>
</form>

<ConfirmActionModal bind:showModal={showConfirmModal} prompt={confirmPrompt} confirmAction={deleteUser} />