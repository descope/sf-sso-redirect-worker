![image](https://github.com/user-attachments/assets/facc14a2-22f4-4a80-9720-cad57f40a774)

# SSO Redirect Worker

This utility, used in Descope's SSO Migration Process, defines and deploys a `CloudFlare Worker` for defining the redirect logic necessary for migrating to Descope.

## SSO Migration

If you have a previous SSO setup with a different authentication provider or a home-grown solution, usually, the tenant's IT management team is forced to re-configure the setup within their IdP to match the new authentication provider.
This can cause a lot of friction and unnecessary time consumption, especially when this process requires reaching out to the customers, changing, and testing the authentication.

To prevent this friction, Descope supports the ability to consume and eventually migrate the current customer's setup.

This creates a totally seamless user login experience for your end users with pre-configured IdPs, without forcing your tenant administrators to have to re-configure their SAML/OIDC settings on their end at all.

The following chart demonstrates your current implementation for Single-Sign-On:
<img width="832" alt="old-sp-sso-migration" src="https://github.com/user-attachments/assets/614ed3e7-e615-442f-bb28-aa38f73d87cf">


And this chart, demonstrates the implementation, post migration:
<img width="832" alt="new-sp-sso-migration" src="https://github.com/user-attachments/assets/4c067e67-2c76-4fc8-877a-ef3e302f82c3">


1. When the end user starts the SSO authentication, a Descope relay state will be created.
2. Once the user is redirected to the IdP, authentication happens as usual.
3. Once the authentication is complete, the IdP response returns to the same SP ACS URL the customer had set previously in the IdP's settings.
4. Using a DNS provider, the response will be redirected to Descope, passing all the needed parameters to complete the authentication.
5. Descope will handle the final response and authenticate the user.
6. The user will be authenticated and logged in.

This utility integrates with step #4 to perform the nesessary redirection logic for Descope to accept all of the authentication paramters.



## ❗ Prerequisites

Using CloudFlare as the DNS provider, a "Worker" is needed to process and redirect the requests using custom logic.

Follow these instructions to create and deploy a new Cloudflare Worker to handle the redirect. 

1. Go to https://dash.cloudflare.com/
2. Create an Account level token: 
    * Manage Account > Account API Tokens > Create token > "Edit Cloudflare Workers"

3. Copy the created token and export it as an environment variable locally:
```
export CLOUDFLARE_API_TOKEN=<CLOUDFLARE_TOKEN>
```

3. [CloudFlare CLI](https://developers.cloudflare.com/cloudflare-one/tutorials/cli/) set up on your local machine.
4. `npm` / `yarn` / any other JavaScript package management tool installed.

## ⚙️ Setup

1. Clone the repo 
```
git clone https://github.com/descope/sso-redirect-worker.git
```

2. Set up the variables

* Update wrangler.toml
    * Line 27 - set your old backend host (old-auth.example.com).
    * Lines 14-15 to your pattern and zone.

## 🚀 Run & Deploy

```
npm i && npm run deploy
```

## ⚠️ Issue Reporting

For any issues or suggestions, feel free to open an issue in the GitHub repository.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
