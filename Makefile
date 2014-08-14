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

build-dist: build
	@mkdir -p dist
	@rm -rf dist/docs
	@mkdir -p dist/docs
	@bin/dist index.html $(GENERATED_FILES) $(wildcard docs/*)

dist: build-dist
	@git add .
	@V=`bin/version`; git commit -m "$(subst VERSION,$$V,DIST VERSION)"
	@V=`bin/version`; git tag $$V

deploy: dist
	@git subtree push --prefix dist origin gh-pages
	@git push origin master

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
