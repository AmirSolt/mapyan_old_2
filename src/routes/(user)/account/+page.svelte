
<script lang="ts">
    import AccountInfo from "$lib/components/account/ui/AccountInfo.svelte";
    import CompareHistory from "$lib/components/account/ui/CompareHistory.svelte";
    import Logout from "$lib/components/account/ui/Logout.svelte";
    import UserDelete from "$lib/components/account/ui/UserDelete.svelte";
</script>


<h1 class="text-4xl ">
    Account
</h1>

<br>
<br>

<div class="card p-4">
    <AccountInfo />
</div>
<br>
<div class="card p-4">
    <CompareHistory />
</div>
<br>
<div class="card p-4">
    <Logout />
</div>
<br>
<div class="card p-4">
    <h2>
        Update password
    </h2>
    <br>
    <a href="/reset-password/update-password" class="btn variant-filled">
    Update Password
    </a>
</div>
<br>
<br>
<div class="card p-4">
    <UserDelete />
</div>