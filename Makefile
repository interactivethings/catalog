SHELL := /bin/bash

CURRENT_VERSION = $(shell node -p 'require("./package.json").version')

UMD_BUILD_FILES = \
	catalog.js \
	catalog.min.js

CLI_SUCCESS = \033[1;32m✔
CLI_ERROR   = \033[1;31m✘
CLI_QUERY   = \033[1;36m→
CLI_RESET   = \033[0m

.PHONY: server build watch-lib version publish clean clobber lint test watch-test

all: server

### DEVELOPMENT

server: node_modules
	yarn start

watch-lib: node_modules
	BABEL_ENV=development $$(yarn bin)/babel src --watch --ignore __tests__ --out-dir lib

watch-cli: node_modules
	BABEL_ENV=node $$(yarn bin)/babel cli/src --watch --ignore __tests__ --out-dir cli/lib

test: lint
	@$$(yarn bin)/jest

watch-test:
	@$$(yarn bin)/jest --watch

lint:
	@$$(yarn bin)/eslint src

### BUILDS

build: node_modules clean test lib cli/lib $(UMD_BUILD_FILES) babel.min.js

lib: src
	@$$(yarn bin)/babel $< --ignore __tests__ --out-dir $@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

cli/lib: cli/src
	@BABEL_ENV=node $$(yarn bin)/babel $< --ignore __tests__ --out-dir $@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

catalog.js:
	@NODE_ENV=development BABEL_ENV=rollup $$(yarn bin)/rollup src/index-standalone --config=rollup.config.js --output=$@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

catalog.min.js:
	@NODE_ENV=production BABEL_ENV=rollup $$(yarn bin)/rollup src/index-standalone --config=rollup.config.js --output=$@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

babel.min.js: node_modules/babel-standalone/babel.min.js
	@cp $< $@

### DOCUMENTATION AND DEPLOYMENT

version:
	@bin/version

publish:
	@bin/publish
	@rm -f $<

### OTHER

clean:
	@rm -rf -- lib $(UMD_BUILD_FILES)

clobber: clean
	@rm -rf node_modules

#
# Dependencies
#

node_modules: package.json
	@yarn install
	@/usr/bin/touch $@
