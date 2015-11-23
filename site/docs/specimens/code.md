## Code

### Arguments

- `collapsed` useful for longer or redundant code that still needs to be accessible
- `lang-{language}` sets the syntax for the code
- `span-[1-6]` defines the width of the code specimen

### Examples


Simple example
```code
codeception
```

Simple example markup
```code|collapsed
'''code
codeception
'''
```

Simple example markup markup
```code
'''code|collapsed
  '''code
  codeception
  '''
'''
```


Syntax highlighting
```code|lang-jsx
import React from 'react';

class ExampleComponent extends React.Component {
  render() {
    return <div>...</div>;
  }
}

```

```code|collapsed,lang-markdown
'''code|lang-jsx
import React from 'react';

class ExampleComponent extends React.Component {
  render() {
    return <div>...</div>;
  }
}
'''
```
