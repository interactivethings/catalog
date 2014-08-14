# Catalog Examples

> This page demonstrates how Catalog can be used. A Catalog page always starts with an introductory text like this and then describes the individual components in Catalog Cards.
>
> This is a new paragraph to demonstrate that it is possible to have one and how nice it looks.

An ordinary paragraph can follow after the lead text. It can point to [other pages](#/). It can contain unordered lists like this:

- Item 1
- Item 2

or ordered lists like this:

1. Item 1
2. Item 2

## Button

This is an example button. The most common usecase is to just add the `.button` class to a link. Here's some more text, so we get several nice lines in this paragraph. Just to see how it looks.

Also, here's another paragraph with a bit more content. But not just that: here's an unordered list:

- Item 1
- Item 2

And an ordered list:

1. The first item is always boring
2. So what do you expect of the second item, then? It might be a bit longer to test multiple lines, but besides that: just as boring!

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

```patterndark
<a class="button button--inverted" href="#">Inverted</a>
```

## Important button

### `.important-button`

Similar to button, but looks more important.

```
<a class="important-button" href="#">Important Button</a>
```


## Link

This example link isn't styled at all. That's why we want to enjoy it on a `plainwhite` background.

```plainwhite
<a href="#">Link</a>
```


## Code

This is a running code example.

```code
<div id="example-target"></div>
<script>window.exampleValue = 'Example content'</script>
<script>
    var target = document.getElementById('example-target')
    target.innerHTML = window.exampleValue + ' inserted by Javascript';
</script>
```
