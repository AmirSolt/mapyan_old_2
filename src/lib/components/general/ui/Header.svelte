<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton'
	import { Flame, Home } from 'lucide-svelte'



	import { page } from '$app/stores'
	$: user = $page.data.session?.user
</script>





<AppBar padding="p-4">

		<svelte:fragment slot="lead">
			<a class="flex gap-1" href="/">
				<Flame /> TL;DR
			</a>
		</svelte:fragment>
	
		<svelte:fragment slot="trail" >
			
			<div class="mx-2">
				<LightSwitch />
			</div>

			{#if user}
				<a href="/account" class="btn variant-filled">
					Account
				</a>
			{:else}
				<a href="/options/login" class="btn variant-filled">
					Login
				</a>

				<a href="/options/signup" class="btn variant-ringed">
					Sign-up
				</a>
			{/if}

			
		</svelte:fragment>
</AppBar>