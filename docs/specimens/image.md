## Image

Images can be used as graphical elements, to document implemtation details with static images or behavioral aspects when animated gifs are used.

### Keys
- `src: string` image to display (gets scaled if it extends the container) 
- `overlay: string` image for mouseover, useful to describe proportions
- `title: string` the title 
- `attributes: array` text description; each entry is a new line 
- `link: string` a link 
- `span: integer` can be used for nesting
- `background: array` refer to the [HTML documentation](/#/html) for the different backgrounds



### Example: Hero Image

By using a plain background and no title you can place a simple image.

```image
[
    {
        "src": "docs/html-project-example/image_bw.jpg",
        "background": ["plain"],
        "span": 6
    }
]
```

_Example image by [unsplash](https://unsplash.com/photos/-YMhg0KYgVc)._

```code
'''image
[
    {
        "src": "docs/html-project-example/image_bw.jpg",
        "background": ["plain"],
        "span": 6
    }
]
'''
```


### Example: Overlay image

The overlay image is useful to document layout measurements for implementation.

```image
[
    {   
        "src": "docs/html-project-example/catalog_logo.png",
        "overlay": "docs/html-project-example/catalog_logo-overlay.png",
        "span": 6
    }
]
```

```code
'''image
[
    {   
        "src": "docs/html-project-example/catalog_logo.png",
        "overlay": "docs/html-project-example/catalog_logo-overlay.png",
        "span": 6
    }
]
'''
```





### Example: Image with details

By adding attributes it is possible to specify implementation details.

```image
[
    {
        "src": "docs/html-project-example/catalog_logo.png",
        "span": 6,
        "background": ["dark"],
        "attributes": [
          "alt text: catalog logo",
          "add .2s fade in animation"
        ]
    }
]
```

```code
'''image
[
    {
        "src": "docs/html-project-example/catalog_logo.png",
        "span": 6,
        "background": ["dark"],
        "attributes": [
          "alt text: catalog logo",
          "add .2s fade in animation"
        ]
    }
]
'''
```

