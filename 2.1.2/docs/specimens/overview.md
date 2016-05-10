> Specimens are the core of Catalog: they help you present your content.

### Using Specimens

#### Markdown

Specimens are defined as Markdown code blocks with an option string.

````
```html|dark
Content goes here...
```
````

The format of the code block option string is as follows: `specimen-type|option1,option2`. 
_Note that no spaces are allowed._

#### React

When you use Catalog in React, specimen options are simply passed as props to the specimen component.

```code|lang-jsx
<HtmlSpecimen dark>
  Content goes here...
</HtmlSpecimen>
```

### Specimen Type

The first part – the one before the `|`-character – is the specimen __type__. The available types are described below.

For example:

````
```image
...
```
````

### Specimen Options

The second part after the `|` is a list of comma-separated __options__ for the specimen. This second part is optional, so both of the following are valid option strings: `html` and `html|dark`.

For example:

````
```code|lang-jsx,span-3
...
```
````

```hint
Specimen options may be removed from future versions of Catalog. We recommend that you use __props__ instead because they allow much more flexibility (see following section).
```

### Specimen Content

The content is what is written between the opening and closing triple-backticks ` ``` `. There are two types of content:

#### Strings

The [HTML](#/html), [Code](#/code), and [Hint](#/hint) specimens take a simple string as content which will be rendered according to the specimen type.

For example:

````
```html
<p>Some HTML</p>
```
````

#### Props

Other specimens (like [Color](#/color)) take structured content as input which is defined by __props__. This content can be written in YAML or JSON syntax.

For example:

````
```color
name: Red
value: #f00
```
````

#### Props and Content

To specify __props__ and __content__ together, separate them with `---` followed by a newline.

For example:

````
```code
span: 2
---
<div>Hello</div>
```
````

#### Documentation conventions

The documentation displays options in a list, using the following pattern:

- __`option: type`__ Option is the name, and type defines the expected type.
- __`src: string`__ Bold options/properties indicate that they are required to be defined
- `loop: boolean` while regular ones are always optional.


