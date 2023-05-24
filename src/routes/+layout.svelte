<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import Header from '$lib/components/general/ui/Header.svelte';
	import Footer from '$lib/components/general/ui/Footer.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	export let data;
	$: ({ supabaseAuthClient, session } = data);

	import { loadUserCountry } from '$lib/utils/country';

	onMount(() => {
		loadUserCountry();
		// ================================
		const { data } = supabaseAuthClient.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>TLDR</title>
	<link rel="icon" href="https://fav.farm/🔥" />
</svelte:head>

<AppShell>
	<svelte:fragment slot="pageHeader">
		<header>
			<Header />
		</header>
	</svelte:fragment>

	<div class="flex justify-center w-full">
		<div class="max-w-7xl p-2 md:p-4 w-full">
			<slot />
		</div>
	</div>

	<svelte:fragment slot="footer">
		<footer>
			<Footer />
		</footer>
	</svelte:fragment>
</AppShell>
