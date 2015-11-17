> Catalog lets you work with HTML projects

## Simple HTML view

A project needs an `index.html` file and will render this inside an `iframe`. A minimal project manifest looks like this and will render the iframe at a default size and without allowing you to scroll content.

```code
&#96;&#96;&#96;<strong>project</strong>
{
    "index.html": "docs/html-project-example/simple.html"
}
&#96;&#96;&#96;
```

It renders this:

```project
{
    "index.html": "docs/html-project-example/simple.html"
}
```


## Advanced Project Configuration

This example has all configuration options available:

```code
&#96;&#96;&#96;<strong>project</strong>
{
    "name": "html-project-example",
    "scrolling": "no",
    "files": {
        "index.html": {
            "source": "docs/html-project-example/visualization.html",
            "template": "docs/html-project-example/template.html"
        },
        "visualization.js": "docs/html-project-example/visualization.js",
        "data.tsv": "docs/html-project-example/example-data.tsv",
        "d3.js": "docs/vendor/d3.min.js"
    },
    "sourceView": ["index.html", "visualization.js", "data.tsv"],
    "size": {
        "height": 500,
        "width": 960
    }
}
&#96;&#96;&#96;
```

This renders the project like this:

```project
{
    "name": "html-project-example",
    "scrolling": "no",
    "files": {
        "index.html": {
            "source": "docs/html-project-example/visualization.html",
            "template": "docs/html-project-example/template.html"
        },
        "visualization.js": "docs/html-project-example/visualization.js",
        "data.tsv": "docs/html-project-example/example-data.tsv",
        "d3.js": "docs/vendor/d3.min.js"
    },
    "sourceView": ["index.html", "visualization.js", "data.tsv"],
    "size": {
        "height": 500,
        "width": 960
    }
}
```


## Include media

If you have binary data (currently only jpeg, gif, and png are supported), you can include it into the project as well and it will be placed into the downloaded zip file.

```project
{
    "index.html": "docs/html-project-example/file.html",
    "files": {
        "dynabook.png": "docs/html-project-example/dynabook.png"
    },
    "size": {
        "height": 150,
        "width": 224
    }
}
```
