
.PHONY: all
all: watch

.PHONY: lint
lint:
	yarn eslint "packages/**/src/*.js"

docs/build: bootstrap
	yarn tsc --build packages && chmod u+x packages/cli/lib/bin/*.js && \
	(cd packages/core; yarn build) && \
	./packages/cli/lib/bin/catalog-build.js docs

.PHONY: bootstrap test build watch version-canary publish-canary
bootstrap:
	yarn lerna bootstrap

test: bootstrap
	yarn jest

build: test
	yarn tsc --build packages && chmod u+x packages/cli/lib/bin/*.js && \
	(cd packages/core; yarn build) && \
	(cd packages/standalone; yarn build)

watch: bootstrap
	yarn tsc --build packages --watch & \
	yarn lerna run watch --parallel

version-canary: build
	yarn lerna version prerelease --preid=canary

publish-canary: build
	yarn lerna publish prerelease --preid=canary --npm-tag=canary