<script lang="ts">

    import {PUBLIC_HCAPTCHA_SITE_KEY} from '$env/static/public'

    // TEST KEY: 10000000-ffff-ffff-ffff-000000000001
    // TEST SECRET: 0x0000000000000000000000000000000000000000
    // TEST RESPONSE: 10000000-aaaa-bbbb-cccc-000000000001





    let hcaptcha;
	let hcaptchaWidgetID;

    import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

    onMount(() => {
		if (browser) {
			hcaptcha = window.hcaptcha;
			if (hcaptcha.render) {
				hcaptchaWidgetID = hcaptcha.render('hcaptcha', {
					sitekey: PUBLIC_HCAPTCHA_SITE_KEY,
				});
			}
		}

	});

    onDestroy(() => {
		if (browser) {
			hcaptcha = { execute: async () => ({ response: '' }), render: () => {} };
		}
	});


</script>

<svelte:head>
    <script src="https://js.hcaptcha.com/1/api.js?render=explicit" async defer></script>
</svelte:head>




<div 
    id="hcaptcha"
    class="h-captcha" 
    data-sitekey="{PUBLIC_HCAPTCHA_SITE_KEY}"
    
></div>
