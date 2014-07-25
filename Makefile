SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)

GENERATED_FILES = \
	catalog.js

.PHONY: build watch clean install

all: build

install: node_modules bower.json

build: clean install $(GENERATED_FILES)

watch: install
	@bin/watch

dist: build
	@mkdir -p dist
	@mkdir -p dist/docs
	@bin/dist index.html $(wildcard docs/*) $(GENERATED_FILES)
	@git add .
	@V=`bin/version`; git commit -m "$(subst VERSION,$$V,DIST VERSION)"
	@git subtree push --prefix dist origin gh-pages
	@V=`bin/version`; git tag $$V; git push origin $$V

clean:
	@rm -rf -- $(GENERATED_FILES)

node_modules: package.json
	@npm install
	@touch $@

bower.json: package.json
	@rm -f $@
	@bin/bower > $@
	@chmod a-w $@

%.js: src/%.coffee
	@webpack --config src/webpack.config.js
