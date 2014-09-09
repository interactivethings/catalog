# Specimens

> Specimens are the core of Catalog

## Overview

Choose either a background style or a render style (but not both), add options as needed. An example:

```specimen-code
&#96;&#96;&#96;bg-dark-pattern|run-script,fullbleed
&lt;a id="dark-button" class="button button--dark"&gt;Dark button&lt;/a&gt;
&lt;script&gt;
    var button = document.getElementById('dark-button');
    button.addEventListener('click', function(evt){
        evt.preventDefault();
        alert('Button clicked!');
    });
&lt;/script&gt;
&#96;&#96;&#96;
```

### Options

Any number of options can be passed to a background or specimen style after the pipe character:

`style|option1,option2,...`

* `run-script` – will run any scripts within the source
* `fullbleed` – removes any horizontal padding and uses the whole width available (TODO)


## HTML

The default specimen.

Use one of these styles to render a background that works with your component.

### `bg-light-pattern` (default)

```bg-light-pattern
bg-light-pattern
```

### `bg-dark-pattern`

```bg-dark-pattern
<span style="color:white">bg-dark-pattern</span>
```

### `bg-plain`

```bg-plain
bg-plain
```

### `bg-light`

```bg-light
bg-light
```

### `bg-dark`

```bg-dark
<span style="color:white">bg-dark</span>
```

## Code

```specimen-code
function() {
    return 'specimen-code';
}
```

## Color

```specimen-color
[
    {"name": "light-blue", "value": "#b0f6ff"},
    {"name": "dark-blue",  "value": "#2666a4"}
]
```

## Icon

```specimen-icon
specimen-icon (TODO)
```

## Project

See the [example](#/html-project) until more documentation is available

## Type

```specimen-type
specimen-type (TODO)
```
