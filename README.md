# Catalog

Catalog helps you create beautiful living style guides quickly and easily. Content is written in Markdown so you can focus on documenting your components. It is completely dependency free, making it trivial to integrate Catalog into your application.

Refer to the [documentation](http://interactivethings.github.io/catalog/) to find out more.

## Development

The only hard dependency is a recent [Node.js](http://nodejs.org/) version (we develop with Node 0.10.x). We use the [Homebrew](http://brew.sh/) package manager to install Node on Mac&nbsp;OS&nbsp;X:

    brew install node

After that, just run `make` in the project root to install all dependencies and build the project.

During development, run `make server` to automatically rebuild the project when you make changes to the source files.

### Publishing new versions

We use semantic versioning (http://semver.org/) to create Catalog packages. When you add new features or bugfixes, you should update the version information in `package.json` and create a new distribution:

    make dist

This will make sure that you don't overwrite an existing version because people can link to published distributions directly, so we don't want to change existing packages. If this check succeeds, the new distribution is published to Github.
