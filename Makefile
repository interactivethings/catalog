SHELL := /bin/bash

CURRENT_VERSION = $(shell node -p 'require("./package.json").version')

DIST_TARGETS = \
	dist/cli \
	dist/loader.js \
	dist/babel \
	dist/setup-template \
	rollup-lib \
	rollup-standalone \

CLI_SUCCESS = \033[1;32m✔
CLI_ERROR   = \033[1;31m✘
CLI_QUERY   = \033[1;36m→
CLI_RESET   = \033[0m

.PHONY: build build-watch rollup-lib rollup-standalone version publish clean clobber lint test test-watch docs build-docs dtslint

all: build-watch

### DEVELOPMENT

build-watch: node_modules dist/setup-template
	@echo -e "$(CLI_SUCCESS) Starting development mode …$(CLI_RESET)"
	@BABEL_ENV=lib $$(yarn bin)/babel src/loader.js --watch --ignore test.js --out-file dist/loader.js & \
	BABEL_ENV=lib $$(yarn bin)/babel src/babel --watch --ignore test.js --out-dir dist/babel & \
	BABEL_ENV=lib $$(yarn bin)/babel cli/src --watch --ignore test.js --out-dir dist/cli & \
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

dist/loader.js: src/loader.js
	@BABEL_ENV=lib $$(yarn bin)/babel $< --ignore test.js --out-file $@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

dist/babel: src/babel
	@BABEL_ENV=lib $$(yarn bin)/babel src/babel --ignore test.js --out-dir dist/babel
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

dist/setup-template: cli/setup-template
	@mkdir -p $(dir $@)
	@cp -R $< $@

dist/cli: cli/src
	@mkdir -p $(dir $@)
	@BABEL_ENV=lib $$(yarn bin)/babel $< --ignore test.js --out-dir $@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"


### RELEASING

version:
	@scripts/version

publish:
	@scripts/publish
	@rm -f $<

.npmrc: .npmrc-template
	@cp $< $@

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
