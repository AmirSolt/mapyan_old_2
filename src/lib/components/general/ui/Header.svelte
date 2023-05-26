<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton'
	import { Flame, Home } from 'lucide-svelte'



	import { page } from '$app/stores'
	$: user = $page.data.session?.user
</script>





<AppBar padding="p-2">

		<svelte:fragment slot="lead">
			<a class="flex justify-center items-center gap-2 text-xl" href="/">
				<img class="w-10 h-10" src="/logo.svg" alt="Logo">
				<h1>
					MAPYAN
				</h1> 
			</a>
			
		</svelte:fragment>
	
		<svelte:fragment slot="trail" >
			

			{#if user}
				<a href="/account" class="btn variant-filled">
					<Home />
				</a>
			{:else}
				<div class="flex gap-2">
					<a href="/email-auth/login" class="btn variant-filled">
						Login
					</a>
					<a href="/email-auth/sign-up" class="btn variant-ringed">
						Sign-up
					</a>
				</div>
			{/if}

			
		</svelte:fragment>
</AppBar>

<div class="flex p-4 justify-end">
	<LightSwitch />
</div>