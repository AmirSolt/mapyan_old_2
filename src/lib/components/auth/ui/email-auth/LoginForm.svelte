
<script lang='ts'>

    import { login } from '../../data/authFuncs'
    import HCaptcha from '../HCaptcha.svelte';

    import {page} from '$app/stores';
    $: ({supabaseAuthClient} = $page.data)


    async function loginForm(e){
        const form = e.target
        let formData = new FormData(form)

        let response = await login(supabaseAuthClient, formData)
    }

</script>


<form on:submit|preventDefault={loginForm}>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" required>
    <label for="password">Password</label>
    <input type="password" name="password" id="password" required>
  
    <button class="btn variant-filled" type="submit">Login</button>
  
    <HCaptcha />
</form>



