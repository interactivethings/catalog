SHELL := /bin/bash

CURRENT_VERSION = $(shell node -p 'require("./package.json").version')

DIST_TARGETS = \
	dist \
	rollup-lib \
	rollup-standalone \

CLI_SUCCESS = \033[1;32m✔
CLI_ERROR   = \033[1;31m✘
CLI_QUERY   = \033[1;36m→
CLI_RESET   = \033[0m

.PHONY: build build-watch rollup-lib rollup-standalone clean clobber lint test test-watch docs build-docs dtslint

all: build-watch

### DEVELOPMENT

build-watch: node_modules dist/setup-template
	@echo -e "$(CLI_SUCCESS) Starting development mode …$(CLI_RESET)"
	BABEL_ENV=rollup $$(yarn bin)/rollup --config=rollup.config.lib.js --watch


test: lint dtslint
	@$$(yarn bin)/jest

test-watch:
	@$$(yarn bin)/jest --watch

lint:
	@$$(yarn bin)/eslint src

dtslint:
	@$$(yarn bin)/tsc --noEmit -p types/catalog

### DOCS

docs:
	@rm -f node_modules/catalog && ln -s ../ node_modules/catalog && ./dist/cli/bin/catalog-start.js --no-babelrc docs

build-docs:
	@rm -f node_modules/catalog && ln -s ../ node_modules/catalog && ./dist/cli/bin/catalog-build.js --no-babelrc docs


### BUILDS

build: node_modules clean $(DIST_TARGETS)

rollup-lib:
	@BABEL_ENV=rollup $$(yarn bin)/rollup $< --config=rollup.config.lib.js
	@echo -e "$(CLI_SUCCESS) Built rollup modules$(CLI_RESET)"

rollup-standalone:
	@BABEL_ENV=rollup $$(yarn bin)/rollup $< --config=rollup.config.standalone.js
	@echo -e "$(CLI_SUCCESS) Built rollup standalone$(CLI_RESET)"

dist:
	mkdir -p $@

### OTHER

clean:
	@rm -rf -- dist

clobber: clean
	@rm -rf node_modules

#
# Dependencies
#

node_modules: package.json yarn.lock
	@yarn install
	@/usr/bin/touch $@
