![image](https://github.com/user-attachments/assets/facc14a2-22f4-4a80-9720-cad57f40a774)

# SSO Redirect Worker

## Set up

### 1. Clone the repo 
```
git clone https://github.com/descope-sample-apps/sso-redirect-worker.git
```

### 2. Set up variables

* Update wrangler.toml
    * Line 27 - set your old backend host (old-auth.example.com).
    * Lines 14-15 to your pattern and zone.

### Run & Deploy

```
npm i && npm run deploy
```
