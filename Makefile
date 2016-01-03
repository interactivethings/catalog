SHELL := /bin/bash

PROJECT_NAME    = Catalog
PROJECT_URL     = http://interactivethings.github.io/catalog/
CURRENT_VERSION = $(shell ./bin/version)
PUBLIC_LIB_URL = https://npmcdn.com/catalog@$(CURRENT_VERSION)/catalog.min.js

UMD_BUILD_TARGETS = \
	catalog.js \
	catalog.min.js

DOC_SOURCES = \
	$(shell find docs -type f \( ! -iname ".*" \))

SITE_DIR        = site
DOC_TARGETS     = $(addprefix $(SITE_DIR)/, $(DOC_SOURCES))

CLI_SUCCESS = \033[1;32m✔
CLI_ERROR   = \033[1;31m✘
CLI_QUERY   = \033[1;36m→
CLI_RESET   = \033[0m

.PHONY: server build watch-lib gh-pages dist deploy clean clobber lint test

all: server

### DEVELOPMENT

server: node_modules
	@NODE_ENV=hot $$(npm bin)/nodemon -q -w webpack.config.js -w bin --exec bin/server

watch-lib: node_modules
	$$(npm bin)/babel src --watch --ignore __tests__ --out-dir lib

test:
	@$$(npm bin)/babel-tape-runner "src/**/__tests__/*.js" | $$(npm bin)/faucet


### BUILDS

build: node_modules clean test lib $(UMD_BUILD_TARGETS)

lib:
	@$$(npm bin)/babel src --ignore __tests__ --out-dir $@

catalog.js:
	@NODE_ENV=development $$(npm bin)/webpack ./src/index-standalone ./$@ --colors --progress --hide-modules

catalog.min.js:
	@NODE_ENV=production $$(npm bin)/webpack ./src/index-standalone ./$@ --colors --progress --hide-modules


### DOCUMENTATION AND DEPLOYMENT

gh-pages: $(SITE_DIR)/index.html $(DOC_TARGETS)
	@$$(npm bin)/gh-pages -d $(SITE_DIR) --add
	@rm -rf $(SITE_DIR)
	@echo -e "$(CLI_SUCCESS) Published version \"$(CURRENT_VERSION)\" to gh-pages$(CLI_RESET)"

dist:
	@bin/dist

### CLEAN

clean:
	@rm -rf -- lib $(UMD_BUILD_TARGETS)

clobber: clean
	@rm -rf node_modules

lint:
	$$(npm bin)/eslint src

#
# Targets
#

$(SITE_DIR)/index.html: index.html package.json
	@mkdir -p $(dir $@)
	@sed -e 's#catalog.js#$(PUBLIC_LIB_URL)#g' \
			$< > $@

$(DOC_TARGETS): $(SITE_DIR)/%: % package.json
	@mkdir -p $(dir $@)
# Replace the string %VERSION% in supported files with the current version,
# otherwise just copy the file to the destination
	$(if $(or \
			$(findstring .md,   $(suffix $<)), \
			$(findstring .txt,  $(suffix $<)), \
		), \
		@sed -e 's:%VERSION%:$(CURRENT_VERSION):g' \
			$< > $@, \
		@cp $< $@)
	@echo $@

#
# Dependencies
#

node_modules: package.json
	@npm install --ignore-scripts
	@/usr/bin/touch $@

