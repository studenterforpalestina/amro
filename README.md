# Amro

This project contains the source code for the new Students for Palestine
Trondheim website.

It is named after A'ed Abu Amro (Arabic: عائد أبو عمرو), the
man in an [iconic photograph][amro-photo] by photojournalist Mustafa Hassona
that has come to symbolize Palestinian resistance.

[amro-photo]: https://www.aa.com.tr/en/middle-east/anadolu-agencys-photo-of-gaza-protester-goes-viral/1293913

## Getting Started

You'll need the following tools installed locally:

- [Bun](https://bun.sh/) —
  JavaScript runtime and package manager
- [Docker Compose](https://docs.docker.com/compose/) —
  for running the database
- [Just](https://just.systems/man/en/) —
  command runner for common development tasks

Once you have these installed, setting up the project is straightforward:

```bash
# Create your local environment configuration
cp .env.example .env

# Install dependencies and start the development server
just install
just dev

# Populate the database with sample data
just seed
```

The default configuration in `.env.example` should work out of the box. If your
local Docker setup uses different ports, adjust them in your `.env` file.

## Setting up Authentik

[Authentik](https://goauthentik.io) is the identity provider used for
authenticating access to the admin panel. If you need to work on the admin page
locally, follow these steps after running `just dev`:

1. Open `localhost/if/flow/initial-setup/` in your browser
2. Create a user — this is only for your local development environment
3. Click on "Create a new application" and fill in the following:
   - Application
     - **Application Name:** sfp-admin
     - **Slug:** sfp-admin
   - Choose a Provider
     - OAuth2/OpenID Provider
   - Configure Provider
     - **Provider Name:** sfp-admin
     - **Authorization flow:** default-provider-authorization-explicit-consent
       (Authorize Application)
     - Protocol settings
       - **Client type:** public
       - **Redirect URIs/Origins (Regex):** `http://localhost:3000/callback`
4. Copy the generated client ID into `PUBLIC_OAUTH_CLIENT_ID` in your `.env`
   file

## Contributing

We welcome contributions to Amro! Please review our [`CONTRIBUTING.md`](CONTRIBUTING.md)
before getting started. It covers the change and review process, and where to
find help for a smooth contribution experience.

## License

Amro is licensed under the [GNU Affero General Public License v3.0](LICENSE).
