SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)

PROJECT_NAME    = Catalog
PROJECT_URL     = http://interactivethings.github.io/catalog/
CURRENT_VERSION = $(shell ./bin/version)
NIGHTLY_VERSION = Build $(shell date "+%Y%m%d.%s")

BUILD_SOURCES = \
	catalog.js

DOC_SOURCES = \
	index.html \
	$(shell find docs -type f)

DIST_DIR        = dist
VERSION_DIR     = $(DIST_DIR)/$(CURRENT_VERSION)
NIGHTLY_DIR     = $(DIST_DIR)/nightly

VERSION_TARGETS = $(addprefix $(VERSION_DIR)/, $(BUILD_SOURCES))
NIGHTLY_TARGETS = $(addprefix $(NIGHTLY_DIR)/, $(BUILD_SOURCES))
LATEST_TARGETS  = $(addprefix $(DIST_DIR)/,    $(BUILD_SOURCES))
DOC_TARGETS     = $(addprefix $(DIST_DIR)/,    $(DOC_SOURCES))

CLI_SUCCESS = \033[1;32m✔
CLI_ERROR   = \033[1;31m✘
CLI_RESET   = \033[0m

#
# Recipes
#

.PHONY: install watch build doc nightly dist deploy clean

all: build

install: node_modules bower.json

watch: install
	@bin/watch

build: install clean
	@webpack --colors --progress --hide-modules --config src/webpack.config.js

doc: install $(DOC_TARGETS)
	@echo -e "$(CLI_SUCCESS) Updated documentation$(CLI_RESET)"

nightly: build doc $(NIGHTLY_TARGETS) $(NIGHTLY_TARGETS:.js=.min.js)
	@echo -e "$(CLI_SUCCESS) Created new nightly distribution$(CLI_RESET)"

dist: _dist-precondition nightly $(VERSION_TARGETS) $(VERSION_TARGETS:.js=.min.js) $(LATEST_TARGETS)
	@git add --all . && \
	git commit --message "DIST $(CURRENT_VERSION)" && \
	git tag --force $(CURRENT_VERSION)
	@echo -e "$(CLI_SUCCESS) Created new distribution \"$(CURRENT_VERSION)\"$(CLI_RESET)"

deploy:
	@git subtree split --prefix $(DIST_DIR) --branch gh-pages && \
	git push --force origin gh-pages:gh-pages && \
	git branch -D gh-pages
	@echo -e "$(CLI_SUCCESS) Deployed distribution \"$(CURRENT_VERSION)\" to $(PROJECT_URL)$(CLI_RESET)"

clean:
	@rm -rf -- $(BUILD_SOURCES)


#
# Targets
#

$(VERSION_DIR)/%: %
	@mkdir -p $(dir $@)
	@echo "/* $(PROJECT_NAME) $(CURRENT_VERSION) $(PROJECT_URL) */" | cat - $< > $@

$(NIGHTLY_DIR)/%: %
	@mkdir -p $(dir $@)
	@echo "/* $(PROJECT_NAME) $(NIGHTLY_VERSION) $(PROJECT_URL) */" | cat - $< > $@

$(LATEST_TARGETS): $(DIST_DIR)/%.js: $(VERSION_DIR)/%.min.js
	@cp $< $@

$(DOC_TARGETS): $(DIST_DIR)/%: %
	@mkdir -p $(dir $@)
	@sed -e 's:%VERSION%:$(CURRENT_VERSION):g' $< > $@

%.min.js: %.js
	@uglifyjs $< \
	--mangle \
	--compress \
	--comments /$(PROJECT_NAME)/ \
	--output $@


#
# Preconditions
#

.PHONY: _dist-precondition
_dist-precondition:
	@if test -d $(VERSION_DIR); then \
	echo "A distribution for \"Catalog $(CURRENT_VERSION)\" has already been published."; \
	echo "You should create a new version by bumping the version number in \"package.json\"."; \
	echo "If you really must recreate the existing version, delete it first."; \
	echo -e "$(CLI_ERROR) Did not create new distribution$(CLI_RESET)"; \
	exit 1; \
	fi


#
# Dependencies
#

node_modules: package.json
	@npm install
	@touch $@

bower.json: package.json
	@rm -f $@
	@bin/bower > $@
	@chmod a-w $@
