# HTML Project Example

> Catalog lets you work with HTML projects

## Line Chart

A simple example

```project
{
    "index.html": "docs/html-project-example/index.html"
}
```

This example has some more configuration, e.g. the size that could also be a string for "phone" or "tablet", etc. Also, these sizes could be configurable through the Catalog config.

```project
{
    "name": "html-project-example",
    "files": {
        "index.html": {
            "source": "docs/html-project-example/index.html",
            "template": "docs/html-project-example/template.html"
        },
        "data.tsv": "docs/html-project-example/data.tsv",
        "d3.js": "docs/html-project-example/d3.min.js"
    },
    "size": {
        "height": 130,
        "width": 130
    }
}
```

### Configuration

The ordinary line chart has some properties:

* Property A
* Property B
