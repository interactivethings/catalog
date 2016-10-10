> The HTML specimen allows the documentation of HTML as well as JavaScript and CSS based views.

Per default, a code toggle button allows easy access to the source without having to write a separate code specimen. It is also possible to access external files that are defined in the catalog configuration. This makes it possible to add quite complex structures like a form with minimal additional specification in the markdown file.

### Props

- `noSource: boolean` Removes the source code toggle button
- `frame: boolean` Wraps output in an `<iframe>` (to prevent style collisions and allow for viewport-relative styling (e.g. using `vw` or `position: fixed`))
- `responsive: boolean | string | array` sets a fixed screensize or allows switching between multiple sizes
- `light: boolean` a light checkered background (default)
- `dark: boolean` a dark checkered background
- `plain: boolean` a transparent background without any padding
- `span: number[1–6]` width of the specimen


### Basic example

This is example uses the configured stylesheet.

```html
<div class="button">
    Hello world
</div>
```

````code
```html
<div class="button">
    Hello world
</div>
```
````

### Framed example

The `frame` prop dynamically wraps the content in an `<iframe>`. This is useful to encapsulate styles and for viewport-oriented layout (such as using `vw` or `position: fixed`)

```html
frame: true
---
<div style='width:100vw;background:#262626;color:#FFF'>
    <p>Hello</p>
    <p>World</p>
</div>
```

````code
---
```html
frame: true
---
<div style='width:100vw;background:#262626;color:#FFF'>
    <p>Hello</p>
    <p>World</p>
</div>
```
````



### Responsive Display

The HTML Specimen supports the same responsive options as the React Specimen. To read more about the options and configuration, visit the [React Specimen](/specimens/react#responsive-display) page.

```html
responsive: true
---
<div>
<style>
.box {
  background: black;
  width: 100vw;
  height: 100%;
  padding:25px;
  box-sizing: border-box;
  color: white;
  text-align: center;
  font-family: 'Helvetica';
  transition: .7s background;
}
@media (min-width: 360px) {
  .box {
    background: #2BF1D3;
    color: #482AC6;
    text-align: left;
  }
}
@media (min-width: 1024px) {
  .box {
    background: #CED3DF;
    color: #482AC6;
  }
}
@media (min-width: 1440px) {
  .box {
    background: tomato;
    color: purple;
  }
}
@media (min-width: 1920px) {
  .box {
    background: purple;
    color: #2BF1D3;
    font-family: 'Georgia';
  }
}
</style>
<div class='box'>
    <h1>Hello World</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</div>
</div>
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



````code|collapsed
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

```html|span-3,no-source,plain
html|span-3,no-source,plain
```
````
