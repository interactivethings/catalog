## HTML


The HTML specimen allows the documentation of HTML as well as JavaScript and CSS based views.
Per default, a code toggle button allows easy access to the source without having to write a separate code specimen. It is also possible to access external files that are defined in the catalog configuration. This makes it possible to add quite complex structures like a form with minimal additional specification in the markdown file. 

It is also the fallback if no specimen is specified.

### Options
#### Functional
* `no-source` Removes the source code toggle button

#### Visual
* `light` a light checkered background (default)
* `dark` a dark checkered background
* `plain` a transparent background without any padding.
* `plain,dark` a solid, dark background without the checkered pattern
* `plain,light` a solid, light background without the checkered pattern
* `span-[1-6]` defines the width


### Functional examples

This is example uses the configured stylesheet.

```html
<div class="button">
    Hello world
</div>
```

```code
'''html
<div class="button">
    Hello world
</div>
'''
```



### Visual examples

The different background colors:

```html|span-3,no-source
html|span-3,no-source
```

```html|span-3,no-source,plain,light
html|span-3,no-source,plain,light
```

```html|span-3,no-source,dark
<span style="color:white">html|span-3,no-source,dark</span>
```

```html|span-3,no-source,plain,dark
<span style="color:white">html|span-3,no-source,plain,dark</span>
```

And without added styling:

```html|span-3,no-source,plain
html|span-3,no-source,plain
```



```code|collapsed
'''html|span-3,no-source
html|span-3,no-source
'''

'''html|span-3,no-source,plain,light
html|span-3,no-source,plain,light
'''

'''html|span-3,no-source,dark
<span style="color:white">html|span-3,no-source,dark</span>
'''

'''html|span-3,no-source,plain,dark
<span style="color:white">html|span-3,no-source,plain,dark</span>
'''

'''html|span-3,no-source,plain
html|span-3,no-source,plain
'''
```


