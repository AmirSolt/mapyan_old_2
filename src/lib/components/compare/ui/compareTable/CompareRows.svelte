<script lang="ts">
	import { XCircle, CheckCircle2 } from 'lucide-svelte';
	import {Smile, Meh, Frown, Angry, Star} from 'lucide-svelte'

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

			{#if cellData==="bad"}
				<span class="text-rose-500 flex justify-center ">
					<Angry />
				</span>
			{:else if cellData==="ok"}
				<span class="text-gray-500 flex justify-center ">
					<Meh />
				</span>
			{:else if cellData==="good"}
				<span class="text-green-500 flex justify-center ">
					<Smile />
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