> The Code Specimen displays a piece of code.

### Props

* `collapsed: boolean` useful for longer or redundant code that still needs to be accessible
* `lang: string` defines the language for code highlighting
* `span: number[1–6]` width of the specimen

### Examples

#### Basic

```code
<div>Hello, Code Specimen</div>
```

````code
```code
<div>Hello, Code Specimen</div>
```
````

#### Syntax highlighting

```code
lang: jsx
---
import React from 'react';

class ExampleComponent extends React.Component {
  render() {
    return <div>...</div>;
  }
}
```

````raw-code
```code
lang: jsx
---
import React from 'react';

class ExampleComponent extends React.Component {
  render() {
    return <div>...</div>;
  }
}
```
````

#### Collapsed Code Block

```code
collapsed: true
---
<div>Hello, collapsed Code Specimen</div>
```

````
```code
collapsed: true
---
<div>Hello, collapsed Code Specimen</div>
```
````
