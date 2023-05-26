
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

<div class="flex justify-center w-full">
    <div class="max-w-2xl p-2 w-full">
        <form on:submit|preventDefault={loginForm}>
            <div>
                <label for="email">Email</label>
                <input class="input w-full" type="email" name="email" id="email" autocomplete="username" required>
                <br>
                <label for="password">Password</label>
                <input class="input w-full" type="password" name="password" id="password" autocomplete="current-password" required> 
            </div>
            <br>
            <button class="btn variant-filled w-full" type="submit">Login</button>
          
        </form>
        
        <br>
        <a href="/reset-password/initiate" class="btn variant-ringed">
            Forgot Password?
        </a>
    </div>
</div>


