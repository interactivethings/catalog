# Catalog Command Line Interface

## Commands

### `catalog start`

Starts a development server at http://localhost:4000 (or another port if that's not free).

A catalog.config.js file is needed for Catalog to run. On the first run, 

### `catalog build`

Builds a static website into `catalog/`. You can deploy this to any web server.

## Principles

- Easy-to-use without unnecessary setup

## Questions

- Do we need basic options like custom entry file and output dir?

## Notes

The Catalog CLI is loosely modeled after Create React App's `react-scripts`. It strips away some of the more sophisticated features like ejecting.

Out of the box, projects based on Create React App and next.js are detected and supported without any special configuration. If you're running Catalog in another webpack-based setup, you can modify the base webpack config via the configuration file.