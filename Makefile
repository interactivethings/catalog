SHELL := /bin/bash

CURRENT_VERSION = $(shell node -p 'require("./package.json").version')

UMD_BUILD_FILES = \
	catalog.js \
	catalog.min.js

DOC_FILES = $(shell find docs -type f \( ! -iname ".*" \))

SITE_DIR = site
SITE_FILES = index.html catalog.js catalog.min.js babel.min.js $(DOC_FILES)
SITE_VERSION_FILES = $(addprefix $(SITE_DIR)/$(CURRENT_VERSION)/, $(SITE_FILES))
SITE_LATEST_FILES = $(addprefix $(SITE_DIR)/, $(SITE_FILES))
SITE_NEXT_FILES = $(addprefix $(SITE_DIR)/next/, $(SITE_FILES))

CLI_SUCCESS = \033[1;32m✔
CLI_ERROR   = \033[1;31m✘
CLI_QUERY   = \033[1;36m→
CLI_RESET   = \033[0m

.PHONY: server build watch-lib gh-pages clean-site site site-next version publish clean clobber lint test watch-test

all: server

### DEVELOPMENT

server: node_modules babel.min.js
	@NODE_ENV=hot $$(npm bin)/nodemon -q -w webpack.config.js -w bin --exec bin/server

watch-lib: node_modules
	$$(npm bin)/babel src --watch --ignore __tests__ --out-dir lib

test: lint
	@$$(npm bin)/jest

watch-test:
	@$$(npm bin)/jest --watch

lint:
	@$$(npm bin)/eslint src

### BUILDS

build: node_modules clean test lib $(UMD_BUILD_FILES) babel.min.js

lib:
	@$$(npm bin)/babel src --ignore __tests__ --out-dir $@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

catalog.js:
	@NODE_ENV=development BABEL_ENV=rollup $$(npm bin)/rollup src/index-standalone --config=rollup.config.js --output=$@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

catalog.min.js:
	@NODE_ENV=production BABEL_ENV=rollup $$(npm bin)/rollup src/index-standalone --config=rollup.config.js --output=$@
	@echo -e "$(CLI_SUCCESS) Built $@$(CLI_RESET)"

babel.min.js: node_modules/babel-standalone/babel.min.js
	@cp $< $@

### DOCUMENTATION AND DEPLOYMENT

version:
	@bin/version

publish: .npmrc
	@bin/publish
	@rm -f $<

gh-pages:
	@$$(npm bin)/gh-pages -d $(SITE_DIR) --add --message '[skip ci] Update docs' --repo 'git@github.com:interactivethings/catalog.git'
	@rm -rf $(SITE_DIR)

clean-site:
	@rm -rf $(SITE_DIR)

site: clean-site $(SITE_VERSION_FILES) $(SITE_LATEST_FILES)

site-next: clean-site $(SITE_VERSION_FILES) $(SITE_NEXT_FILES)

.npmrc: .npmrc-template
	@cp $< $@

$(SITE_DIR)/$(CURRENT_VERSION)/index.html: index.html
	@mkdir -p $(dir $@)
	@sed -e 's#catalog.js#catalog.min.js#g' $< > $@

$(SITE_DIR)/$(CURRENT_VERSION)/%: %
	@mkdir -p $(dir $@)
	@cp -R $< $@
# Replace the string %VERSION% in supported files with the current version,
# otherwise just copy the file to the destination
	$(if $(or \
			$(findstring .md,   $(suffix $<)), \
			$(findstring .txt,  $(suffix $<)), \
		), \
		@sed -e 's:%VERSION%:$(CURRENT_VERSION):g' $< > $@, \
		@cp $< $@)

$(SITE_DIR)/%: $(SITE_DIR)/$(CURRENT_VERSION)/%
	@mkdir -p $(dir $@)
	@cp -R $< $@

$(SITE_DIR)/next/%: $(SITE_DIR)/$(CURRENT_VERSION)/%
	@mkdir -p $(dir $@)
	@cp -R $< $@

### OTHER

clean:
	@rm -rf -- lib $(UMD_BUILD_FILES)

clobber: clean
	@rm -rf node_modules

#
# Dependencies
#

node_modules: package.json
	@npm install --ignore-scripts
	@/usr/bin/touch $@
