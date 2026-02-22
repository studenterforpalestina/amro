# Contributing to Amro

Thank you for your interest in contributing to Amro!

Please note that the project adheres to a [Code of Conduct](https://codeberg.org/studenterforpalestina/.profile/src/branch/main/CODE_OF_CONDUCT.md).
By participating, you're expected to uphold this code.

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

# Start the database and run migrations
just docker

# Populate the database with sample data
just seed

# Install dependencies and start the development server
just install
just dev
```

The default configuration in `.env.example` should work out of the box. If your
local Docker setup uses different ports, adjust them in your `.env` file.

## Making Changes

Before submitting a pull request, please ensure your changes are well-tested and
follow the existing code style. If you're fixing a bug, consider adding a test
that would've caught it.

We recommend signing your commits with a GPG key, as this helps verify the
authenticity of contributions. See [Codeberg's guide on adding a GPG key to your account](https://docs.codeberg.org/security/gpg-key/) if you haven't set this up before.

## Reviewing Changes

All pull requests require approval from two maintainers before they can be
merged. Maintainers may request changes or decline contributions that don't
align with the project's direction.

Maintainers may push minor fixes like formatting or style adjustments directly
to your branch. If you prefer to handle all changes yourself, please mention
this in your pull request description.

Pull requests are rebased onto main before merging, so please keep your commits
well-organized.

## Getting Help

If you run into issues or have questions about the codebase, there are a few
ways to get help:

- Open an issue — For bugs, feature requests, or general questions
- Zulip — Organization members can reach out in the [#it-komité channel](https://studenterforpalestina.zulipchat.com/#narrow/channel/557303-it-komit.C3.A9)
  for discussion

We're happy to help you get started or work through any problems you encounter.
