SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)

PROJECT_NAME    = Catalog
PROJECT_URL     = http://interactivethings.github.io/catalog/
CURRENT_VERSION = $(shell ./bin/version)

UMD_BUILD_TARGETS = \
	catalog.js \
	catalog.min.js \
	catalog-lib.js \
	catalog-lib.min.js

DOC_SOURCES = \
	index.html \
	$(shell find docs -type f \( ! -iname ".*" \))

DIST_DIR        = dist
VERSION_DIR     = $(DIST_DIR)/$(CURRENT_VERSION)

VERSION_TARGETS = $(addprefix $(VERSION_DIR)/, $(UMD_BUILD_TARGETS))
LATEST_TARGETS  = $(addprefix $(DIST_DIR)/,    $(UMD_BUILD_TARGETS))
DOC_TARGETS     = $(addprefix $(DIST_DIR)/,    $(DOC_SOURCES))

CLI_SUCCESS = \033[1;32m✔
CLI_ERROR   = \033[1;31m✘
CLI_QUERY   = \033[1;36m→
CLI_RESET   = \033[0m

.PHONY: server build watch-lib doc dist deploy clean clobber lint test

all: server


### DEVELOPMENT

server: node_modules
	@NODE_ENV=hot bin/server

watch-lib: node_modules
	babel src --watch --out-dir lib

test:
	@babel-node test/*.js | faucet


### BUILDS

build: node_modules clean test lib $(UMD_BUILD_TARGETS)

lib:
	babel src --out-dir $@

catalog.js:
	@NODE_ENV=development webpack ./src/index ./$@ --colors --progress --hide-modules

catalog.min.js:
	@NODE_ENV=production webpack ./src/index ./$@ --colors --progress --hide-modules

catalog-lib.js:
	@NODE_ENV=development webpack ./src/index ./$@ --config=./webpack.lib.js --colors --progress --hide-modules

catalog-lib.min.js:
	@NODE_ENV=production webpack ./src/index ./$@ --config=./webpack.lib.js --colors --progress --hide-modules


### DOCUMENTATION AND DEPLOYMENT

doc: install $(DOC_TARGETS)
	@echo -e "$(CLI_SUCCESS) Updated documentation$(CLI_RESET)"

dist:
	@bin/dist

deploy:
	@git subtree split --prefix $(DIST_DIR) --branch gh-pages && \
	git push --force origin gh-pages:gh-pages && \
	git branch -D gh-pages
	@echo -e "$(CLI_SUCCESS) Deployed distribution \"$(CURRENT_VERSION)\" to $(PROJECT_URL)$(CLI_RESET)"


### CLEAN

clean:
	@rm -rf -- lib $(UMD_BUILD_TARGETS)

clobber: clean
	@rm -rf node_modules

lint:
	eslint src

#
# Targets
#

$(DOC_TARGETS): $(DIST_DIR)/%: % package.json
	@mkdir -p $(dir $@)
# Replace the string %VERSION% in supported files with the current version,
# otherwise just copy the file to the destination
	$(if $(or \
			$(findstring .css,  $(suffix $<)), \
			$(findstring .html, $(suffix $<)), \
			$(findstring .js,   $(suffix $<)), \
			$(findstring .md,   $(suffix $<)), \
			$(findstring .txt,  $(suffix $<)), \
		), \
		@sed -e 's:%VERSION%:$(CURRENT_VERSION):g' $< > $@, \
		@cp $< $@)
	@echo $@

#
# Dependencies
#

node_modules: package.json
	@npm install --ignore-scripts
	@touch $@

