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
type-check:
    bun run check

# type check in watch mode
type-check-watch:
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

# check the formatting of files
fmt *files="":
    bunx biome format {{ files }}

# run various checks on a set of files
lint *files="":
    bunx biome lint {{ files }}

# check formatting, linting, and import organization
check *files="":
    bunx biome check {{ files }}

# clean build artifacts
clean:
    rm -rf .svelte-kit build
