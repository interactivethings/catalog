> Specimens are the core of Catalog. They help you present your style guide content.

## Using Specimens

Specimens are defined as Markdown code blocks, denoted with the **specimen type**.

The content of the code block contains the specimen configuration (**props**) in YAML or JSON format.

For example:

````
```color
value: '#f55'
name: 'Red'
```
````

Here, `color` is the specimen **type**, `value` and `name` are **props** of the Color specimen.

### Content

Some specimens accept **content** in addition to props.

For example, you can embed code snippets with the Code Specimen:

```code
span: 2
---
function foo() {
  return 'bar';
};
```

````code
span: 4
---
```code
function foo() {
  return 'bar';
};
```
````

#### Combining Props and Content

To combine props and content, separate them with `---` on a separate line (props go first).

```code
span: 2
lang: js
---
function foo() {
  return 'bar';
};
```

````code
span: 4
---
```code
lang: js
---
function foo() {
  return 'bar';
};
```
````


### Specimen Layout

All specimens accept a `span` prop, which you can use to lay them out in a six-column grid layout. Span values range from 1 – 6.

For example, setting `span: 2` scales the specimen to one third of the full width:

```color
value: '#003B5C'
name: 'Blue'
span: 2
```

````code
span: 4
---
```color
value: '#003B5C'
name: 'Blue'
span: 2
```
````

### Specimen Imports

Imports are useful if you want to generate content for specimens or when you use the [React Specimen](/specimens/react).

Use the `!import` keyword for your props to reference any [imports that you have configured](/configuration#imports) or use anything you import directly in your React Specimens.

````code
span: 3
---
```color-palette
colors: !import myBeautifulColors
```
````

````code
span: 3
---
```react
<MyImportedComponent />
```
````

### Extras

#### The Option String

Specimen can also configured with an **option string** which is kind of a shorthand notation for certain props.

The option string directly follows the **type** from which it is separated with a `|` (pipe) character. Multiple options are separated with a comma. For example: `code|span-2,lang-js`.

For example:

```code|lang-jsx,span-2
<MyCoolComponent />
```

````code
span: 4
---
```code|lang-jsx,span-2
<MyCoolComponent />
```
````

```hint
Not all props are supported in the option string. Refer to the individual specimens to see which are.
```

```hint
The specimen option string may be removed from future versions of Catalog. We recommend that you use **props** instead because they are more flexible.
```

#### Specimens as React Components

In a React app, you can directly import Catalog's components and use them directly (only for the adventurous types). Props map to the specimen's … props.

```code|lang-jsx
import {Page, HtmlSpecimen} from 'catalog';

export default () => (
  <Page>
    <HtmlSpecimen dark>
      Content goes here...
    </HtmlSpecimen>
  </Page>
);
```
