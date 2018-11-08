
.PHONY: all
all: watch

.PHONY: lint
lint:
	yarn eslint "packages/**/src/*.js"

docs/build:
	@./node_modules/.bin/lerna bootstrap
	@./node_modules/.bin/tsc --build packages
	@(cd packages/core; ../../node_modules/.bin/rollup --config rollup.config.js)
	@node ./packages/cli/lib/bin/catalog-build.js docs

.PHONY: bootstrap test build watch version-canary publish-canary
bootstrap:
	yarn lerna bootstrap

test: bootstrap
	yarn jest

build: test
	yarn tsc --build packages && \
	yarn lerna run build --parallel

watch: bootstrap
	yarn tsc --build packages --watch & \
	yarn lerna run watch --parallel

version-canary: build
	yarn lerna version prerelease --preid=canary

publish-canary: build
	yarn lerna publish prerelease --preid=canary --npm-tag=canary