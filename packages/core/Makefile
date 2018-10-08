SHELL := /bin/bash

CURRENT_VERSION = $(shell node -p 'require("./package.json").version')

DIST_TARGETS = \
	dist \
	rollup-lib

CLI_SUCCESS = \033[1;32m✔
CLI_ERROR   = \033[1;31m✘
CLI_QUERY   = \033[1;36m→
CLI_RESET   = \033[0m

.PHONY: build build-watch rollup-lib clean clobber test test-watch

all: build-watch

### DEVELOPMENT

build-watch: node_modules
	@echo -e "$(CLI_SUCCESS) Starting development mode …$(CLI_RESET)"
	BABEL_ENV=rollup node_modules/.bin/rollup --config=rollup.config.js --watch

test:
	@node_modules/.bin/jest

test-watch:
	@node_modules/.bin/jest --watch

### BUILDS

build: node_modules clean $(DIST_TARGETS)

rollup-lib:
	@BABEL_ENV=rollup ../../node_modules/.bin/rollup $< --config=rollup.config.js
	@echo -e "$(CLI_SUCCESS) Built rollup modules$(CLI_RESET)"

dist:
	mkdir -p $@

### OTHER

clean:
	@rm -rf -- dist

clobber: clean
	@rm -rf node_modules
