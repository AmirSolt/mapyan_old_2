
<script lang='ts'>

    import { login } from '$lib/components/auth/data/authFuncs'

    import {page} from '$app/stores';
	import { goto } from '$app/navigation';
    $: ({supabaseAuthClient} = $page.data)


    async function loginForm(e){
        const form = e.target
        let formData = new FormData(form)

        let response = await login(supabaseAuthClient, formData)

        goto("/")
    }

</script>


<form on:submit|preventDefault={loginForm}>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" required>
    <label for="password">Password</label>
    <input type="password" name="password" id="password" required>
  
    <button class="btn variant-filled" type="submit">Login</button>
  
</form>

<a href="/reset-password/initiate" class="btn variant-filled">
    Logout
</a>

