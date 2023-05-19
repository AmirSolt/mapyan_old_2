<script lang="ts">

    import {selectedProducts} from '$lib/utils/stores'


    import {onMount} from "svelte";

    onMount(async () => {
        let response = await fetch(
            '/compare',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    selectedProducts:$selectedProducts
                })

        })

        let data = await response.json()

        console.log("Compare.svelte:",data)
    });

</script>