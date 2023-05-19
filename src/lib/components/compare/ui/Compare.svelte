<script lang="ts">

    import {selectedProducts, userCountry} from '$lib/utils/stores'


    import {onMount} from "svelte";

    onMount(async () => {
        let response = await fetch(
            '/api/compare',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    selectedProducts:$selectedProducts,
                    userCountry:$userCountry
                })

        })

        let data = await response.json()

        console.log("Compare.svelte:",data)
    });

</script>