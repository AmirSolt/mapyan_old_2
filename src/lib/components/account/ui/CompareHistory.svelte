
<script lang='ts'>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import {page} from '$app/stores';
    import CompareTable from '$lib/components/compare/ui/compareTable/CompareTable.svelte'
	
    $: ({compare_instances} = $page.data)


    function localize(date){
        return new Date(date).toLocaleString()
    }

</script>

<h2>
    History
</h2>


{#if compare_instances}

<Accordion>
    {#each compare_instances as compare_instace}
        <AccordionItem>
            <svelte:fragment slot="lead">
                (icon)
            </svelte:fragment>
            <svelte:fragment slot="summary">
                <span>
                    Comparision
                </span>
                <small>
                   {localize(compare_instace.created_at)}
                </small>
            </svelte:fragment>
            <svelte:fragment slot="content">

                    <CompareTable compareProductsRaw={compare_instace.table_data} />

            </svelte:fragment>
        </AccordionItem>
    {/each}
</Accordion>

{/if}