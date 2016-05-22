With Catalog you write documentation using [Markdown](http://daringfireball.net/projects/markdown/syntax). For an introduction to the Markdown syntax, [Mastering Markdown](https://guides.github.com/features/mastering-markdown/) of GitHub is a good starting point.

Catalog supports all basic Markdown features like headings, paragraphs, blockquotes, lists etc. To create interactive and rich documentation, Catalog introduces **Specimens**.

## Specimens

Specimens are a kind of _tagged_ code blocks. In the same way that on GitHub you define the programming language of a code block for syntax highlighting, in Catalog you specify a Specimen type and options.

For example, to place a color swatch in your documentation you write

````
```color
value: '#f55'
name: 'Red'
span: 2
```
````

… which will be rendered like this:

```color
value: '#f55'
name: 'Red'
span: 2
```

Catalog provides many specimen types, from images, hints, code snippets to fully interactive HTML and React component specimens. For a full list of all specimens and their features, go to the [Specimen documentation](/specimens)

## Example Page

Specimens can be placed anywhere in a Markdown document. For example:

````code|lang-markdown
# Page Title

> Some lead text (a blockquote, optional)

Introductory text

## A Title

Some description.

- A bullet point list
- with
- some
- items

### A subtitle

This is a code specimen:

```code
function identity(x) {
  return x;
}
```

## Another Title

And some more text.

```image
src: img/cat.jpg
title: Nice Cat
```
````
