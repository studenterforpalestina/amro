# Base
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Install deps into temp dirs (for caching)
FROM base AS install

# Dev deps (needed for build)
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Prod deps only
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Build stage
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build

# Final runtime image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/build ./build
COPY --from=prerelease /usr/src/app/package.json .

USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "./build/index.js"]
