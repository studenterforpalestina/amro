default:
    just --list

# install dependencies
install:
    bun install

# start dev server
dev:
    bun --bun run dev

# build for production
build:
    bun run build

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

# format files
fmt *files=".":
    bunx biome format --write {{ files }}

# lint and apply safe fixes to files
lint *files=".":
    bunx biome lint --write {{ files }}

# format, lint, and organize imports of files
check *files=".":
    bunx biome check --write {{ files }}

# clean build artifacts
clean:
    rm -rf .svelte-kit build
