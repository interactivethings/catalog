## HTML

The default specimen if no argument string is specified.

### Examples

#### Backgrounds

#### `html|no-source,light`

```html|no-source,light
html|no-source,light
```

#### `html|no-source,dark`

```html|no-source,dark
<span style="color:white">html|no-source,dark</span>
```

#### `html|no-source,plain,light`

```html|no-source,plain,light
html|no-source,plain,light
```

#### `html|no-source,plain,dark`

```html|no-source,plain,dark
<span style="color:white">html|no-source,plain,dark</span>
```

And, at last: The `plain` option generates a transparent background with no padding.

```html|no-source,plain
html|no-source,plain
```




### Options
* `light` – a light checkered background (default)
* `dark` – a dark checkered background
* `plain` – a transparent background without any padding. If combined with `light` or `dark`, the checker pattern is removed
* `no-source` – Removes the source code toggle button
* `run-script` – will run any scripts within the source
* `span-[1-6]` – defines the width
