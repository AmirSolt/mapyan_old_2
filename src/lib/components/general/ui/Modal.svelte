<script lang="ts">
	import { X } from 'lucide-svelte';
	export let showModal: boolean;
	export let coverScreen: boolean = true;
	let dialog: any;

	$: if (dialog && showModal) dialog.showModal();

	let dialogClass = coverScreen?
		"card rounded-lg p-0 w-5/6 h-5/6 max-w-2xl":
		"card rounded-lg p-0 w-3/6 h-2/6 max-w-2xl max-h-xl"
</script>



<!-- ****** To close the dialog by clicking on background ****** -->
<!-- on:click|self={() => dialog.close()} -->
<!-- *********************************************************** -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if showModal}
	<dialog
		class="{dialogClass}"
		bind:this={dialog}
		on:close={() => (showModal = false)}
		>
		<div on:click|stopPropagation class="h-full">
			<div class="sticky top-0 h-0">
				<div class="flex justify-end p-1">
					<!-- svelte-ignore a11y-autofocus -->
					<button class="btn-icon variant-filled-error" autofocus on:click={() => dialog.close()}
						><X /></button
					>
				</div>
			</div>
			<!-- <slot name="header" /> -->
			<div class="h-full" >
				<slot />
			</div>

		</div>
	</dialog>
{/if}






<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
