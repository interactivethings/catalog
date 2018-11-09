# Setup

### 1. Install dependencies

```
npm ci
```

### 2. Bootstrap packages

This will install all dependencies in the individual packages and link packages with each other.

```
./node_modules/.bin/lerna bootstrap
```

### 3. Start the tests in watch mode

```
./node_modules/.bin/jest --watch
```

### 4. Start the docs catalog

This will start up the local catalog that is stored in the `docs/` folder. Use it to test the changes you do to the core package.

```
make
```

# Release

Releasing is done manually. We currently publish two kinds of releases: canary (alpha) and latest (stable, production-ready).

TODO: The release process should eventually be automated through travis-ci.

### Canary

Canary releases are published under the npm dist-tag `canary` and a semver tag `-alpha.N`.

```
./node_modules/.bin/tsc --build packages
make build -C packages/core build
make build -C packages/standalone build
./node_modules/.bin/lerna publish --canary
```

### Latest

The following steps publish all packages under a new version.

```
./node_modules/.bin/lerna version
./node_modules/.bin/tsc --build packages
make build -C packages/core build
make build -C packages/standalone build
./node_modules/.bin/lerna publish from-git
```
