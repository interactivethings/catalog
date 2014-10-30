# HTML Project Example

> Catalog lets you work with HTML projects

## Example Line Chart

A project needs an `index.html` file and will render this inside an `iframe`. A minimal project manifest looks like this:

```code
&#96;&#96;&#96;<strong>project</strong>
{
    "index.html": "docs/html-project-example/index.html"
}
&#96;&#96;&#96;
```

And renders this:

```project
{
    "index.html": "docs/html-project-example/index.html"
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
            "source": "docs/html-project-example/index.html",
            "template": "docs/html-project-example/template.html"
        },
        "script.js": "docs/html-project-example/script.js",
        "data.tsv": "docs/html-project-example/example-data.tsv",
        "d3.js": "docs/vendor/d3.min.js"
    },
    "sourceView": ["index.html", "script.js", "data.tsv"],
    "size": {
        "height": 130,
        "width": 130
    }
}
&#96;&#96;&#96;
```

This renders the project like this:

```project
{
    "name": "html-project-example",
    "files": {
        "index.html": {
            "source": "docs/html-project-example/index.html",
            "template": "docs/html-project-example/template.html"
        },
        "script.js": "docs/html-project-example/script.js",
        "data.tsv": "docs/html-project-example/example-data.tsv",
        "d3.js": "docs/vendor/d3.min.js"
    },
    "sourceView": ["index.html", "script.js", "data.tsv"],
    "size": {
        "height": 130,
        "width": 130
    }
}
```

