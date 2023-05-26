
<script lang='ts'>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import {page} from '$app/stores';
    import CompareTable from '$lib/components/compare/ui/compareTable/CompareTable.svelte'
	import {History} from 'lucide-svelte'
    $: ({compare_instances} = $page.data)


    // Fix compare_instances length and order

    function cleanCompareInstances(list:any[]){
        let rList = list.reverse()
        if(rList.length>5)
            rList = rList.slice(0,5)

        return rList
    }

    function localize(date){
        return new Date(date).toLocaleString()
    }

</script>

<h2>
    History
</h2>
<small>Latest top</small>


{#if compare_instances}

<Accordion>
    {#each cleanCompareInstances(compare_instances) as compare_instace}
        <AccordionItem>
            <svelte:fragment slot="lead">
                <History />
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

                    <CompareTable tableData={compare_instace.table_data} />

            </svelte:fragment>
        </AccordionItem>
    {/each}
</Accordion>

{/if}