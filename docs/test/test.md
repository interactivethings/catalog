> This page demonstrates all the typographic combinations in Catalog and serves as a test case at the same time. A Catalog page always starts with an introductory text like this and then describes the individual components in Catalog Cards.

An ordinary paragraph can follow after the lead text. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things. It can repeat things.

![A cute kitty](https://placekitten.com/640/400)

> Blockquotes can appear multiple times, even though that might not make too much sense … Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `.code` text.
>
> ## Heading in a blockquote
>
> * Blockquotes
>   * With lists
>
> > Nested blockquote

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `(...args) => {return args;}` text. ~~Strikethrough text~~

Link [to a heading](#jump-to-me)

Link [to another page section](/specimens#combining-properties-and-content)

Root-relative link [not handled by Catalog](/assets/catalog_logo.svg)

Mailto link [not handled by Catalog](mailto:foo@bar.com)

External link [not handled by Catalog](https://www.interactivethings.com/)

Plain link https://www.interactivethings.com/

Plain email foo@bar.com

---

## Hints with content

```hint|warning
# A heading

Some `inline code`, yeah!

## Subheading
### Subheading
#### Subheading
##### Subheading
###### Subheading

> Foo bar

And a [link](#hints-with-content), and another one: https://catalog.style
```

## Responsive scrolling test

```react
responsive: true
---
<div style={{height: '2000px', background: 'linear-gradient(to bottom, rgba(248,80,50,1) 0%, rgba(224,230,39,1) 100%)'}}>Helloo</div>
```

## Fancy React source transformation

```react
const Foo = ({name}) => <div>{name}</div>;
const h=React.createElement;
h(Foo, {name: 'boo'});
```

```react
[
  <div>hey</div>,
  <div>ho</div>
]
```

Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

* An unordered list item
  * A nested list item
    * three levels deep
* Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `.code` text.

Ordered lists work too:

1.  An ordered list item Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis libero excepturi a architecto et inventore fugiat voluptas eaque itaque beatae, sequi optio atque possimus doloremque nam, explicabo, repellat voluptate nostrum.
    1.  A nested list item
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
        1.  three levels deep
1.  Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `.code` text.

## Jump to me!

A final paragraph before we begin with the real thing: the Cards!

# H1 Lorem ipsum dolor sit amet

## H2 Lorem ipsum dolor sit amet

### H3 Lorem ipsum dolor sit amet

#### H4 Lorem ipsum dolor sit amet

##### H5 Lorem ipsum dolor sit amet

###### H6 Lorem ipsum dolor sit amet

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti dolorum recusandae esse, nisi laborum animi aspernatur quidem sequi ipsum blanditiis unde. Sapiente totam atque autem quis saepe aliquid expedita voluptatibus.

> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi facilis ipsam alias excepturi deserunt, amet tenetur soluta iste id dolorem corporis dolore, cupiditate! Vitae illo corrupti quasi at, minima tempore.

An ordinary paragraph can follow after the lead text. It can repeat things. It can repeat things. It can repeat things. Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `.code` text.

> Blockquotes appear differently when used within the text.
>
> * Blockquotes
>   * With lists

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### An example section with a slightly longer title to see how it looks over multiple lines

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

---

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Lists

Are totally possible.

* An unordered list item
  * A nested list item
    * three levels deep
* Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `.code` text.

Ordered lists work too:

1.  An ordered list item
1.  A nested list item
    1.  three levels deep
1.  Inline elements are styled nicely: text [link](http://example.com) text _italic_ text **bold** text `.code` text.

### `.button` button

A very basic button.

```html
<a class="button" href="#">Button</a>
```

### `.button` in a frame

```html|frame
<a class="button" href="#">Button</a>
```

### responsive `.button`

```html|responsive
<a class="button" href="#">Button</a>
```

#### `.button--disabled`

This button can't be clicked. If you do something against clicking it, that is.

```html
<a class="button button--disabled" href="#">Disabled</a>
```

#### button `.button--inverted`

Use this beautiful button on dark backgrounds.

```html|dark
<a class="button button--inverted" href="#">Inverted</a>
```

### Further example

#### `.button--inverted`

```html|dark
<a class="button button--inverted" href="#">Inverted</a>
```

#### More sections are possible

It's incredible!

### Even more

```
<a class="button" href="#">Button</a>
```

```
<a class="button" href="#">Button</a>
```

```
<a class="button" href="#">Button</a>
```

## Important button

### Subtitle

Similar to button, but looks more important.

```
<a class="important-button" href="#">Important Button</a>
```

> a block quote

> another one
