# Contributing to Amro

## Prerequisites

Before you start, ensure you have the following installed on your local machine:

* **[Bun](https://bun.sh/):** Our JavaScript runtime and package manager.
* **[Docker Compose](https://docs.docker.com/compose/):** Used to orchestrate the database environment.

---

### 1. Environment Setup

Copy the example environment file to create your local configuration:

```bash
cp .env.example .env
```

*Note: Open `.env` and adjust any credentials if your local Docker setup
requires specific ports, however the default should be OK*

### 2. Spin up the Database

We use Docker to manage our PostgreSQL instance. Run the following command to start the database and automatically run migrations:

```bash
docker-compose up -d
```

### 3. Seed the Database

To make development easier, we provide a script to populate your database with dummy data:

```bash
bun scripts/seed.ts
```

### 4. Install Dependencies & Run

```bash
bun install
bun dev
```

---

## 🏗 Development Workflow

To keep the repository clean and organized, please follow this workflow:

I don't really care. 
Try having GPG commits enabled

---

## 🤝 Need Help?

If you get stuck or have questions about the codebase, feel free to open an issue or reach out to the maintainers. We're happy to help!
