# Page typography with a somewhat long title to make sure we have a line break

> This page demonstrates how Catalog can be used. A Catalog page always starts with an introductory text like this and then describes the individual components in Catalog Cards.

An ordinary paragraph can follow after the lead text. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things.

> Blockquotes can appear multiple times, even though that might not make too much sense … Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `.code` text.

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `.code` text.

Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

- An unordered list item
- Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `.code` text.

Ordered lists work too:

1. An ordered list item
2. Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `.code` text.

A final paragraph before we begin with the real thing: the Cards!

## Catalog test page with a very long title to test line breaks

> This page demonstrates how Catalog can be used. A Catalog page always starts with an introductory text like this and then describes the individual components in Catalog Cards.
>
> This is a new paragraph to demonstrate that it is possible to have one and that having one looks nice, too. Don't make it too short because that would be slightly ugly.

An ordinary paragraph can follow after the lead text. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things.

> Blockquotes can appear multiple times, even though that might not make too much sense … Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `.code` text.

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `.code` text.

Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

- An unordered list item
- Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `.code` text.

Ordered lists work too:

1. An ordered list item
2. Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `.code` text.

A final paragraph before we begin with the real thing: the Cards!

### `.button`

A very basic button.

```
<a class="button" href="#">Button</a>
```

#### `.button--disabled`

This button can't be clicked. If you do something against clicking it, that is.

```
<a class="button button--disabled" href="#">Disabled</a>
```

#### `.button--inverted`

Use this beautiful button on dark backgrounds.

```html|dark
<a class="button button--inverted" href="#">Inverted</a>
```

## Important button

### `.important-button`

Similar to button, but looks more important.

```
<a class="important-button" href="#">Important Button</a>
```


## Link

This example link isn't styled at all. That's why we want to enjoy it on a `plain` background.

```html|plain
<a href="#">Link</a>
```


## Colors

Here are some colors.

```color
[
    {"name": "light-blue", "value": "#b0f6ff"},
    {"name": "dark-blue",  "value": "#2666a4"}
]
```

## Code

This is a running code example:

```html|plain,run-script
<div id="example-target">FAILED: Javascript was not run</div>
<script>
    var target = document.getElementById('example-target')
    target.innerHTML = window.exampleValue + ' inserted by Javascript';
</script>
```

It uses the following code:

```code
&#96;&#96;&#96;html|plain,run-script
&lt;div id="example-target"&gt;FAILED: Javascript was not run&lt;/div&gt;
&lt;script&gt;window.exampleValue = 'Example content'&lt;/script&gt;
&lt;script&gt;
    var target = document.getElementById('example-target')
    target.innerHTML = window.exampleValue + ' inserted by Javascript';
&lt;/script&gt;
&#96;&#96;&#96;
```
