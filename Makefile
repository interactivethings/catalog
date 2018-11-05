
.PHONY: all
all: watch

.PHONY: lint
lint:
	@./node_modules/.bin/eslint packages '*.js'
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
	yarn lerna version prerelease --preid=canary --force-publish

publish-canary:
	yarn lerna publish from-git --npm-tag=canary