# Contributing to Amro

Thank you for your interest in contributing to Amro!

Please note that the project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code.

## Prerequisites

Before you start, ensure you have the following installed on your local machine:

- [Bun](https://bun.sh/) —
  JavaScript runtime and package manager
- [Docker Compose](https://docs.docker.com/compose/) —
  used to orchestrate the database environment
- [Just](https://just.systems/) —
  command runner for common development tasks

### 1. Environment Setup

Copy the example environment file to create your local configuration:

```bash
cp .env.example .env
```

_Note: Open `.env` and adjust any credentials if your local Docker setup
requires specific ports, however the default should be OK_

### 2. Spin up the Database

We use Docker to manage our PostgreSQL instance. Run the following command to start the database and automatically run migrations:

```bash
just docker
```

### 3. Seed the Database

To make development easier, we provide a script to populate your database with dummy data:

```bash
just seed
```

### 4. Install Dependencies & Run

```bash
just install
just dev
```

---

## 🏗 Development Workflow

To keep the repository clean and organized, please follow this workflow:

I don't really care.
Try having GPG commits enabled

---

## 🤝 Need Help?

If you get stuck or have questions about the codebase, feel free to open an issue or reach out to the maintainers. We're happy to help!
