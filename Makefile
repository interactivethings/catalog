
.PHONY: all
all:
	# Compile the CLI tool
	@./node_modules/.bin/tsc --build packages
	# Run rollup in the background to continuously build the core package
	@(cd packages/core; ../../node_modules/.bin/rollup --watch --config rollup.config.js) &
	# Start the server
	@node ./packages/cli/lib/bin/catalog-start.js docs

.PHONY: test
test:
	@./node_modules/.bin/jest

.PHONY: lint
lint:
	@./node_modules/.bin/eslint packages '*.js'

.PHONY: build
build:
	@./node_modules/.bin/tsc --build packages
