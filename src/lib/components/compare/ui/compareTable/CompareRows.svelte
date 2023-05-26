<script lang="ts">
	import { XCircle, CheckCircle2 } from 'lucide-svelte';
	import {HelpCircle, ThumbsDown, ThumbsUp} from 'lucide-svelte'

	export let key:any = null
	export let cellData:any = null


</script>


{#if cellData}
	<td class="text-center">
		{#if typeof cellData === 'boolean'}
			{#if cellData}
				<span class="text-green-500 flex justify-center">
					<CheckCircle2 />
				</span>
			{:else}
				<span class="text-rose-500 flex justify-center">
					<XCircle />
				</span>
			{/if}
		{:else if typeof cellData === 'string'}


			{#if cellData==="DW"}
				<span class="flex justify-center ">
					<ThumbsUp fill="#15ad67" />
				</span>
			{:else if cellData==="DQ"}
				<span class="flex justify-center ">
					<HelpCircle color="#b8b2b2" />
				</span>
			{:else if cellData==="DL"}
				<span class="flex justify-center ">
					<ThumbsDown fill="#e32222" />
				</span>
			{:else}

				{cellData}	
	
			{/if}




		{:else if typeof cellData === 'number'}
			{cellData}
		{:else if typeof cellData === 'undefined'}
			<span class="text-rose-500 flex justify-center">
				-
			</span>
		{:else}
			{cellData}
		{/if}
	</td>

{:else}
	<td class="text-center">
		<span class="text-rose-500 flex justify-center">
			-
		</span>
	</td>
{/if}