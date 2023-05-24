<script lang="ts">
	import { selectedProducts, userCountry } from '$lib/utils/stores';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import LoadingAnim from '$lib/components/general/ui/LoadingAnim.svelte';
	import CompareTable from './compareTable/CompareTable.svelte';

	let tableData: any[]=[];
	let remainingCredit: number = 0;
	let isLoading: boolean = true;

	// ======================= Loading Logic ============================
	import { tweened } from 'svelte/motion';
	let original = 40; // TYPE NUMBER OF SECONDS HERE
	let timer = tweened(original);
	setInterval(() => {
		if ($timer > 0) $timer--;
	}, 1000);
	$: progressValue = ((original - $timer) / original) * 100;

	async function getAIResponse() {
		let response = await fetch('/api/compare', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				selectedProducts: $selectedProducts,
				userCountry: $userCountry
			})
		});

		let data = await response.json();

		tableData = data.tableData;
		remainingCredit = data.finalCredit;
		isLoading = false;

		console.log('Compare.svelte:', data);
	}




	import { onMount } from 'svelte';
	onMount(async () => {
		getAIResponse();
	});

	
</script>

{#if isLoading}
	<!-- <ProgressRadial width="w-12" stroke={100} /> -->

	<div class="flex p-2 flex-col">
		<LoadingAnim />
		<br />
		<ProgressBar
			rounded="rounded-lg"
			class="rounded-none"
			meter="bg-primary-500"
			height="h-4"
			value={progressValue}
		/>

		<br />
		<div class="flex flex-col justify-center items-center text-center">
			<p class="text-2xl">Generating a comparison table</p>
			<br />
			<p>This usually takes about 30 seconds</p>
			<p>We are working to improve the loading speed.</p>
			<p>Thank you for being patient.</p>
		</div>
	</div>
{:else}
	<div class="flex flex-col p-2 h-full w-full">
		<br />

		<div>
			<h2>
				Your Remaining Credit: {remainingCredit}
			</h2>

			<p class="text-sm">*This information has been generated with the help AI, and has not been confirmed by a human.</p>
		</div>

		<br />
		<hr />
		<br />


	

		<div>
			<CompareTable {tableData} />
		</div>
	</div>
{/if}
