SHELL := /bin/bash

CURRENT_VERSION = $(shell node -p 'require("./package.json").version')

DIST_TARGETS = \
	dist/cli \
	dist/setup-template \
	dist/catalog-standalone.dev.js \
	dist/catalog-standalone.min.js

CLI_SUCCESS = \033[1;32m✔
CLI_ERROR   = \033[1;31m✘
CLI_QUERY   = \033[1;36m→
CLI_RESET   = \033[0m

.PHONY: build build-watch rollup-lib rollup-standalone version publish clean clobber lint test test-watch

all: build-watch

### DEVELOPMENT

build-watch: node_modules dist/setup-template
	@echo -e "$(CLI_SUCCESS) Starting development mode …$(CLI_RESET)"
	@BABEL_ENV=lib $$(yarn bin)/babel cli/src --watch --ignore test.js --out-dir dist/cli & \
	BABEL_ENV=rollup $$(yarn bin)/rollup --config=rollup.config.lib.js --watch

test: lint
	@$$(yarn bin)/jest

test-watch:
	@$$(yarn bin)/jest --watch

lint:
	@$$(yarn bin)/eslint src

### BUILDS

build: node_modules clean rollup-lib rollup-standalone dist/cli dist/setup-template

rollup-lib:
	@BABEL_ENV=rollup $$(yarn bin)/rollup $< --config=rollup.config.lib.js
	@echo -e "$(CLI_SUCCESS) Built modules$(CLI_RESET)"

rollup-standalone: dist/catalog-standalone.dev.js dist/catalog-standalone.min.js

dist/setup-template: cli/setup-template
	cp -R $< $@

dist/cli: cli/src
	@BABEL_ENV=lib $$(yarn bin)/babel $< --ignore test.js --out-dir $@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

dist/catalog-standalone.dev.js:
	@NODE_ENV=development BABEL_ENV=rollup $$(yarn bin)/rollup --config=rollup.config.standalone.js --output=$@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

dist/catalog-standalone.min.js:
	@NODE_ENV=production BABEL_ENV=rollup $$(yarn bin)/rollup --config=rollup.config.standalone.js --output=$@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"


### RELEASING

version:
	@scripts/version

publish: .npmrc
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
