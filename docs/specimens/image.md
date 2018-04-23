> Images can be used as graphical elements, to document implemtation details with static images or behavioral aspects when animated gifs are used.

### Props

- `src: string` image to display (gets scaled if it extends the container)
- `overlay: string` image for mouseover, useful to describe proportions
- `title: string` the title
- `description: string` Markdown-formatted text description
- `light: boolean` a light checkered background (default)
- `dark: boolean` a dark checkered background
- `plain: boolean` a transparent background without any padding.
- `scale: boolean` Scale the image down if it's wider than the container. Defaults to true.
- `span: number[1–6]` width of the specimen

```hint|directive
The `src` and `overlay` keys accept the `srcSet` notation, which allows the usage of responsive images.
```

### Examples

#### Styles

```image
light: true
span: 3
src: "/assets/catalog_logo.png"
```

````code|span-3
```image
light: true
span: 3
src: "/assets/catalog_logo.png"
```
````

```image
dark: true
span: 3
src: "/assets/catalog_logo--white.png"
```

````code|span-3
```image
dark: true
span: 3
src: "/assets/catalog_logo--white.png"
```
````

```image
plain: true
span: 3
src: "/assets/catalog_logo.png"
```

````code|span-3
```image
plain: true
span: 2
src: "/assets/catalog_logo.png"
```
````

```image
light: true
plain: true
span: 3
src: "/assets/catalog_logo.png"
```

````code|span-3
```image
light: true
plain: true
span: 3
src: "/assets/catalog_logo.png"
```
````

```image
dark: true
plain: true
span: 3
src: "/assets/catalog_logo--white.png"
```

````code|span-3
```image
dark: true
plain: true
span: 3
src: "/assets/catalog_logo--white.png"
```
````

#### Title and description

```image
span: 3
src: "/assets/catalog_logo.png"
title: "Catalog Logo"
description: |
  The quick brown fox
  jumps over
  multiple lines
```

````code|span-3
```image
span: 3
src: "/assets/catalog_logo.png"
title: "Catalog Logo"
description: |
  The quick brown fox
  jumps over
  multiple lines
```
````

```image
span: 3
dark: true
src: "/assets/catalog_logo--white.png"
title: "Catalog Logo"
description: |
  The quick brown fox
  jumps over
  multiple lines
```

````code|span-3
```image
span: 3
dark: true
src: "/assets/catalog_logo--white.png"
title: "Catalog Logo"
description: |
  The quick brown fox
  jumps over
  multiple lines
```
````

```image
span: 3
plain: true
src: "/assets/catalog_logo.png"
title: "Catalog Logo"
description: |
  The quick brown fox
  jumps over
  multiple lines
```

````code|span-3
```image
span: 3
plain: true
src: "/assets/catalog_logo.png"
title: "Catalog Logo"
description: |
  The quick brown fox
  jumps over
  multiple lines
```
````

#### Hero image

By using a plain background and no title you can place a simple image.

```image
plain: true
src: "/assets/image_bw.jpg"
description: "_Example image by [unsplash](https://unsplash.com/photos/-YMhg0KYgVc)._"
```

````code
```image
plain: true
src: "/assets/image_bw.jpg"
description: "_Example image by [unsplash](https://unsplash.com/photos/-YMhg0KYgVc)._"
```
````


#### Scale option

When you set `scale` to false then the image will be shown in original size. If it overflows
horizontally, then a scrollbar will show up. Use this option if the original size of the
image needs to be preserved (eg. because it contains measurements).

```image
plain: true
scale: false
src: "/assets/image_bw.jpg"
```

````
```image
plain: true
scale: false
src: "/assets/image_bw.jpg"
```
````


#### Overlay image

The overlay image is useful to document layout measurements for implementation.

```image
scale: false
src: "/assets/catalog_logo.png"
overlay: "/assets/catalog_logo-overlay.png"
```

````code
```image
scale: false
src: "/assets/catalog_logo.png"
overlay: "/assets/catalog_logo-overlay.png"
```
````



```image
plain: true
scale: false
src: "/assets/catalog_logo.png"
overlay: "/assets/catalog_logo-overlay.png"
```

````code
```image
plain: true
scale: false
src: "/assets/catalog_logo.png"
overlay: "/assets/catalog_logo-overlay.png"
```
````





