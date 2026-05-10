default:
    just --list

# install dependencies
install:
    bun install

# start docker services from compose
docker *args="":
    docker compose up {{ args }}

# shuts down compose and wipes stored data
down-wipe:
    docker compose down -v

# shuts down compose without wiping stored data
down:
    docker compose down

# seeds postgres db with test data
seed:
    bun run scripts/seed.ts

# start dev server with the required docker services
dev:
    docker compose up -d db migrate authentik_db worker server && bun run dev

# run production build
build:
    bun run build

# run docker build for production
docker-build:
    docker compose up --build

# preview production build
preview:
    bun run preview

# type check
check:
    bun run check

# type check in watch mode
check-watch:
    bun run check:watch

# run tests
test *args="":
    bun test {{ args }}

# run tests in watch mode
test-watch *args="":
    bun test --watch {{ args }}

# run tests with coverage
test-coverage *args="":
    bun test --coverage {{ args }}

# format files with Prettier
fmt:
    bun run format

# run linting with ESLint and Prettier
lint:
    bun run lint

# clean build artifacts
clean:
    rm -rf .svelte-kit build
