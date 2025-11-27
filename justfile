default:
    just --list

# install dependencies
install:
    bun install

# start dev server
dev:
    bun run dev

# build for production
build:
    bun --bun run build

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
