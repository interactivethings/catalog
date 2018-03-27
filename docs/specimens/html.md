> The HTML specimen allows the documentation of HTML as well as JavaScript and CSS based views.

Per default, a code toggle button allows easy access to the source without having to write a separate code specimen. It is also possible to access external files that are defined in the catalog configuration. This makes it possible to add quite complex structures like a form with minimal additional specification in the markdown file.

### Props

- `noSource: boolean` Removes the source code toggle button
- `showSource: boolean` Shows the source code section by default
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
.responsive-playground-example {
  font-family: Helvetica;
  margin: auto;
  padding: 24px;
  text-align: center;
  background-color: #c2d8ea; /* ixt-blue-100 */
  color: #003B5C;
}
.responsive-playground-example > h1 {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 12px;
}
.responsive-playground-example > p {
  font-size: 16px;
  padding-bottom: 12px;
}

.grid {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
}
.box {
  flex-grow: 1;
  height: 72px;
  margin-bottom: 12px;
  background-color: #205779;
}
.box:last-child {
  margin: 0;
}

@media (min-width: 1024px) {
  .grid {
    flex-direction: row;
  }
  .box {
    width: 320px;
    height: 144px;
    margin: 0;
    margin-right: 12px;
    background-color: #205779;
  }
  .box:nth-child(2){
    margin: 0;
    margin-bottom: 12px;
  }
}

@media (min-width: 1440px) {
  .responsive-playground-example p {
    padding: 0 16em;
    padding-bottom: 12px;
  }
  .box {
    margin: 0;
    margin-right: 12px;
  }
  .box:nth-child(2){
    margin: 0;
    margin-right: 12px;
  }
}

</style>
<div class='responsive-playground-example'>
  <h1>Responsive Grid Example</h1>
  <div class='grid'>
    <div class='box'></div>
    <div class='box'></div>
    <div class='box'></div>
    <div class='box'></div>
  </div>
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
