# Auth0 Next.js SDK Sample Application

This sample demonstrates the integration of
[Auth0 Next.js SDK](https://github.com/auth0/nextjs-auth0) into a Next.js
application created using
[create-next-app](https://nextjs.org/docs/api-reference/create-next-app). The
sample is a companion to the
[Auth0 Next.js SDK Quickstart](https://auth0.com/docs/quickstart/webapp/nextjs).

This sample demonstrates the following use cases:

- [Login](https://github.com/auth0-samples/auth0-nextjs-samples/blob/main/Sample-01/components/NavBar.jsx#L61-L67)
- [Logout](https://github.com/auth0-samples/auth0-nextjs-samples/blob/main/Sample-01/components/NavBar.jsx#L93-L95)
- [Showing the user profile](https://github.com/auth0-samples/auth0-nextjs-samples/blob/main/Sample-01/pages/profile.jsx)
- [Protecting client-side rendered pages](https://github.com/auth0-samples/auth0-nextjs-samples/blob/main/Sample-01/pages/profile.jsx#L43-L46)
- [Calling APIs](https://github.com/auth0-samples/auth0-nextjs-samples/blob/main/Sample-01/pages/external.jsx)

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

After that, you'll want to start Supabase via Docker. You can do this by running
the following command:

```bash
supabase start
```

## Configuration

### Configure credentials

The project needs to be configured with your Auth0 Domain, Client ID and Client
Secret for the authentication flow to work.

To do this, first copy `.env.local.example` into a new file in the same folder
called `.env.local`, and replace the values with your own Auth0 application
credentials (see more info about
[loading environmental variables in Next.js](https://nextjs.org/docs/basic-features/environment-variables)):

```sh
# A long secret value used to encrypt the session cookie
AUTH0_SECRET='LONG_RANDOM_VALUE'
# The base url of your application
AUTH0_BASE_URL='http://localhost:3000'
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN.auth0.com'
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
# Your Auth0 API's Identifier 
# OMIT if you do not want to use the API part of the sample
AUTH0_AUDIENCE='YOUR_AUTH0_API_IDENTIFIER'
# The permissions your app is asking for
# OMIT if you do not want to use the API part of the sample
AUTH0_SCOPE='openid profile email read:shows'
```

**Note**: Make sure you replace `AUTH0_SECRET` with your own secret (you can
generate a suitable string using `openssl rand -hex 32` on the command line).
