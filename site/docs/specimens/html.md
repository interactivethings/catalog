## HTML


The HTML specimen allows the documentation of HTML as well as JavaScript and CSS based views.
Per default, a code toggle button allows easy access to the source without having to write a separate code specimen. It is also possible to access external files that are defined in the catalog configuration. This makes it possible to add quite complex structures like a form with minimal additional specification in the markdown file. 

It is also the fallback if no specimen is specified.

### Arguments
#### Functional
* `no-source` Removes the source code toggle button
* `run-script` will run any scripts within the source

#### Visual
* `light` a light checkered background (default)
* `dark` a dark checkered background
* `plain` a transparent background without any padding.
* `plain,dark` a solid, dark background without the checkered pattern
* `plain,light` a solid, light background without the checkered pattern
* `span-[1-6]` defines the width


### Functional examples

This example uses the `run-script` argument to execute the JavaScript automatically. The `exampleValue` variable is declared in a file that is added and only available to this page in the catalog configuration. To see how this is done, take a look at the [Initialization](/#/usage) guide.

```html|run-script
<div id="example-target">FAILED: Javascript was not run</div>
<script>
    var target = document.getElementById('example-target')
    target.innerHTML = exampleValue + ' inserted by JavaScript';
</script>
```


```code
'''html|run-script
<div id="example-target">FAILED: Javascript was not run</div>
<script>
    var target = document.getElementById('example-target')
    target.innerHTML = exampleValue + ' inserted by JavaScript';
</script>
'''
```


This is example shows a similar approach, but uses the linked stylesheet information.

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


