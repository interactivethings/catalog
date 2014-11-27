# HTML Project Example

> Catalog lets you work with HTML projects

## Example Line Chart

A project needs an `index.html` file and will render this inside an `iframe`. A minimal project manifest looks like this:

```code
&#96;&#96;&#96;<strong>project</strong>
{
    "index.html": "docs/html-project-example/simple.html",
    "size": {
        "height": 100,
        "width": 140
    }
}
&#96;&#96;&#96;
```

And renders this:

```project
{
    "index.html": "docs/html-project-example/simple.html",
    "size": {
        "height": 100,
        "width": 140
    }
}
```


## Advanced Project Configuration

This example has all configuration options available:

```code
&#96;&#96;&#96;<strong>project</strong>
{
    "name": "html-project-example",
    "files": {
        "index.html": {
            "source": "docs/html-project-example/visualization.html",
            "template": "docs/html-project-example/template.html"
        },
        "visualization.js": "docs/html-project-example/visualization.js",
        "data.tsv": "docs/html-project-example/example-data.tsv",
        "d3.js": "docs/vendor/d3.min.js"
    },
    "sourceView": ["index.html", "visualization.js", "data.tsv"]
}
&#96;&#96;&#96;
```

This renders the project like this:

```project
{
    "name": "html-project-example",
    "files": {
        "index.html": {
            "source": "docs/html-project-example/visualization.html",
            "template": "docs/html-project-example/template.html"
        },
        "visualization.js": "docs/html-project-example/visualization.js",
        "data.tsv": "docs/html-project-example/example-data.tsv",
        "d3.js": "docs/vendor/d3.min.js"
    },
    "sourceView": ["index.html", "visualization.js", "data.tsv"]
}
```

