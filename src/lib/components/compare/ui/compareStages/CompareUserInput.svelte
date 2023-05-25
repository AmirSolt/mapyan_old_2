<script lang="ts">

    export let isOver:boolean = false;
    export let userInput:{} = {};


    async function submitForm(e){
        const form = e.target
        let formData = new FormData(form)
        // userInput. = formData.get('email')?.toString()?? ''

        console.log(formData)
    }
</script>


<form on:submit|preventDefault={submitForm}>
    <div>
        <label for="email">Email</label>
        <input class="w-full" type="email" name="email" id="email" autocomplete="username" required>
        <br>
        <label for="password">Password</label>
        <input class="w-full" type="password" name="password" id="password" autocomplete="current-password" required>
        <br>
        <span>Textarea</span>
        <textarea name="To avoid" class="textarea" rows="4" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
    </div>
    <br>
    <button class="btn variant-filled w-full" type="submit">Submit</button>
  
</form>