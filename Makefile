.PHONY: test
test:
	@./node_modules/.bin/jest

.PHONY: lint
lint:
	@./node_modules/.bin/eslint packages '*.js'

.PHONY: build
build:
	@./node_modules/.bin/tsc --build packages
