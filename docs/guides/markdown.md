> With Catalog you write documentation using [Markdown](http://daringfireball.net/projects/markdown/syntax).

For an introduction to the Markdown syntax, [Mastering Markdown](https://guides.github.com/features/mastering-markdown/) of GitHub is a good starting point.

Catalog supports all basic Markdown features like headings, paragraphs, blockquotes, lists etc. To create interactive and rich documentation, Catalog introduces **Specimens**.

## Specimens

Specimens are an extension of standard Markdown syntax to include special content like color palettes and fully interactive components in your style guide.

All Specimens are written as _tagged_ Markdown code blocks (similar to how you specify the programming language of a code block for syntax highlighting on GitHub).

For example, to place a color swatch in your documentation:

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

## Links

Use regular Markdown link to pages within your Catalog documentation.

Each page section can be linked to directly by adding a hash to your link. Click on the link icon next to a heading to jump to that section.

```code|lang-markdown
- [A link to a page](/specimens)
- [A link to a page section](/specimens#content)
- [A link to section on the same page](#example-page)
- [External links work too of course](https://www.interactivethings.com/)
- [Also external links which don't point to a page](/assets/catalog_logo.png)
```

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
