# Platform args
ARG BUILDPLATFORM
ARG TARGETPLATFORM

# Base image for build/install stages 
FROM --platform=$BUILDPLATFORM docker.io/oven/bun:1 AS base_build
WORKDIR /usr/src/app

# Base image for runtime stage (uses build target platform by default)
FROM docker.io/oven/bun:1 AS base_runtime
WORKDIR /usr/src/app

# Install deps into temp dirs (for caching)
FROM base_build AS install

# Dev deps (needed for build)
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Prod deps only
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Build stage
FROM base_build AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
ENV NODE_ENV=production
RUN bun --bun run build

# Final runtime image
FROM base_runtime AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/build ./build
COPY --from=prerelease /usr/src/app/scripts ./scripts
COPY --from=prerelease /usr/src/app/package.json .

USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "./build/index.js"]
