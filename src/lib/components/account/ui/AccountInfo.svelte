
<script lang='ts'>
    import {page} from '$app/stores';
	
    $: ({session, account} = $page.data)

</script>


<h3>
    Email: {session.user.email}
</h3>