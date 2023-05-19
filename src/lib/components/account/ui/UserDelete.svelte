<script lang='ts'>



    async function deleteUser(){
        await fetch('/api/delete-user')
        // redirect(302, "/")
    }


    function confirmDelete(){
        let r = confirm("Are you sure you want to delete your account?");

        if(r){
            deleteUser();
        }
    }

</script>



<h2>Delete your account</h2>
<form on:submit|preventDefault={confirmDelete}>
    <button class="btn variant-filled" type="submit"> Delete Your Data</button>
</form>