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
			{cellData}	
			{#if cellData==="bad"}
				<span class="text-rose-500 flex justify-center ">
					<Angry />
				</span>
			{/if}
			{#if cellData==="ok"}
				<span class="text-amber-500 flex justify-center ">
					<Meh />
				</span>
			{/if}
			{#if cellData==="good"}
				<span class="text-gray-500 flex justify-center ">
					<Smile />
				</span>
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