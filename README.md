![image](https://github.com/user-attachments/assets/facc14a2-22f4-4a80-9720-cad57f40a774)

# SSO Redirect Worker

This utility, used in Descope's SSO Migration Process, defines and deploys a `CloudFlare Worker` for defining the redirect logic necessary for migrating to Descope.

## ❗ Prerequisites

1. [CloudFlare CLI](https://developers.cloudflare.com/cloudflare-one/tutorials/cli/) set up on your local machine.
2. `npm` / `yarn` / any other JavaScript package management tool installed.

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
