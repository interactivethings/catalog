
> The Code Specimen displays a piece of code.

### Options

- `collapsed` useful for longer or redundant code that still needs to be accessible
- `lang-{language}` defines the language for code highlighting
- `span-[1-6]` defines the width of the code specimen

### Examples

#### Basic

```code
<div>Hello, Code Specimen</div>
```

```code|lang-markdown
'''code
<div>Hello, Code Specimen</div>
'''
```

#### Syntax highlighting

```code|lang-jsx
import React from 'react';

class ExampleComponent extends React.Component {
  render() {
    return <div>...</div>;
  }
}

```

```code|lang-markdown
'''code|lang-jsx
import React from 'react';

class ExampleComponent extends React.Component {
  render() {
    return <div>...</div>;
  }
}
'''
```

#### Collapsed Code Block

```code|collapsed
<div>Hello, collapsed Code Specimen</div>
```

```code|lang-markdown
'''code|collapsed
<div>Hello, collapsed Code Specimen</div>
'''
```
