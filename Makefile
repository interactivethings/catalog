SHELL := /bin/bash

CURRENT_VERSION = $(shell node -p 'require("./package.json").version')

DIST_TARGETS = \
	dist/lib \
	dist/cli \
	dist/setup-template \
	dist/catalog.lib.js \
	dist/catalog.dev.js \
	dist/catalog.min.js

CLI_SUCCESS = \033[1;32m✔
CLI_ERROR   = \033[1;31m✘
CLI_QUERY   = \033[1;36m→
CLI_RESET   = \033[0m

.PHONY: build watch-lib version publish clean clobber lint test watch-test

all:
	@echo -e "Please choose a task to run"

### DEVELOPMENT

watch-lib: node_modules
	BABEL_ENV=lib $$(yarn bin)/babel src --watch --ignore test.js --out-dir dist/lib

watch-cli: node_modules
	BABEL_ENV=lib $$(yarn bin)/babel cli/src --watch --ignore test.js --out-dir dist/cli

test: lint
	@$$(yarn bin)/jest

watch-test:
	@$$(yarn bin)/jest --watch

lint:
	@$$(yarn bin)/eslint src

### BUILDS

build: node_modules clean test $(DIST_TARGETS)

dist/lib: src
	@BABEL_ENV=lib $$(yarn bin)/babel $< --ignore test.js --out-dir $@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

dist/catalog.lib.js: src/index.js
	@BABEL_ENV=rollup-lib $$(yarn bin)/rollup $< --config=rollup.config.lib.js --output=$@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

dist/setup-template: cli/setup-template
	cp -R $< $@

dist/cli: cli/src
	@BABEL_ENV=lib $$(yarn bin)/babel $< --ignore test.js --out-dir $@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

dist/catalog.dev.js: src/index-standalone.js
	@NODE_ENV=development BABEL_ENV=rollup-browser $$(yarn bin)/rollup $< --config=rollup.config.browser.js --output=$@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

dist/catalog.min.js: src/index-standalone.js
	@NODE_ENV=production BABEL_ENV=rollup-browser $$(yarn bin)/rollup $< --config=rollup.config.browser.js --output=$@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"


### RELEASING

version:
	@bin/version

publish: .npmrc
	@bin/publish
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

node_modules: package.json
	@yarn install
	@/usr/bin/touch $@
