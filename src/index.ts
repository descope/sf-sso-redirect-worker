/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
export default {
	async fetch(request, env, ctx): Promise<Response> {

		let url = env.OLD_ACS_URL;

		const requestClone = request.clone();

		const requestUrl = new URL(request.url);

		if (request.method === 'POST') {
			const contentType = request.headers.get('Content-Type');
			if (contentType && (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data'))) {
				const formData = await request.formData();
				if (formData.get('RelayState')?.toString().startsWith('s/')) {
					console.log('Descope SAML request detected, proxying to', env.NEW_ACS_URL);
					url = env.NEW_ACS_URL;
				}
			} else {
				console.warn('Invalid Content-Type for FormData:', contentType);
			}
		}

		// Check for Descope SAML request in query parasm
		const relayStateQueryParam = requestUrl.searchParams.get('RelayState');
		if (relayStateQueryParam?.startsWith('s/')) {
			console.log('Descope SAML request detected, proxying to', env.NEW_ACS_URL);
			url = env.NEW_ACS_URL
		}

		return fetch(url, requestClone);
	}
} satisfies ExportedHandler<Env>;
