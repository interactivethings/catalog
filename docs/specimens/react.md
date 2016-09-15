> The React Specimen lets you document and build React components.

### Props

- `noSource: boolean` Removes the source code toggle button
- `frame: boolean` Wraps output in an `<iframe>` (to prevent style collisions and allow for viewport-relative styling (e.g. using `vw` or `position: fixed`))
- `light: boolean` a light checkered background (default)
- `dark: boolean` a dark checkered background
- `plain: boolean` a transparent background without any padding
- `span: number[1–6]` width of the specimen

### Plain

Just write JSX code in the specimen content.

````
```react
<MyCoolComponent>My cool component</MyCoolComponent>
```
````

### With State

For documenting interactive components, the React Specimen provides local state and a `setState` function to the specimen code.

To set the initial state, declare a `state` property with the desired shape (remember, you can use YAML or JSON).

````
```react
state: {foo: 0}
---
<MyCoolComponent
  onChange={() => setState({foo: state.foo + 1})}
>
  {state.foo}
</MyCoolComponent>
```
````

### Examples

#### With State

```react
state: {clicked: 0}
---
<button onClick={() => setState({clicked: state.clicked + 1})}>
  Clicked {state.clicked} times
</button>
```





## Reponsive settings

### Configuration

To test or document responsive behavior of React components, Catalog allows you to select predefined screen sizes.
These can be defined in the configuration by setting a `devices` array. The default List contains `small, medium, large` and `xlarge`
Let's assume you want to work with a smart watch, a tablet and Desktop, it could look something like this:

```code
...
title: 'Catalog',
devices: [
  {name: 'watch', width: 272, height: 340}
  {name: 'tablet', width: 1024, height: 768},
  {name: 'desktop', width: 1920, height: 1080},
],
pages : [
...

```

### Usage

In order to use it, use either `true` for all devices from the list, a specific one like `small` or an array with strings to only show those. 

```table
rows:
  - value: 'true'
    description: Display tab for all screen sizes defined in the Catalog configuration or the default list of `small, medium, large, xlarge`.
  - value: "small"
    description: Shows only the screen size matching the string
  - value: '["small", "large"]'
    description: Allows switching between the defined screen sizes.
```

```react|noSource
responsive: true
state: {clicked: 0}
---
<div style={{
  backgroundColor: state.clicked < 100 ? '#003B5C' : '#ff5555',
  color: 'white',
  fontFamily: 'sans-serif',
  height: '100%',
  padding: '20px'
  }}>
  <img src='docs/assets/catalog_logo--white.png' style={{display: 'block', width: 200, margin: 25}}/>
  <button onClick={() => setState({clicked: state.clicked + 1})}>
    Clicked {state.clicked < 100 ? state.clicked : 'an unhealthy amount of'} times
  </button>
</div>
```

````
```react
responsive: true
state: {clicked: 0}
---
<div style={{
  backgroundColor: state.clicked < 100 ? '#003B5C' : '#ff5555',
  color: 'white',
  fontFamily: 'sans-serif',
  height: '100%',
  padding: '20px'
  }}>
  <img src='docs/assets/catalog_logo--white.png' style={{display: 'block', width: 200, margin: 25}}/>
  <button onClick={() => setState({clicked: state.clicked + 1})}>
    Clicked {state.clicked < 100 ? state.clicked : 'an unhealthy amount of'} times
  </button>
</div>
```
````

The `span` parameter allows to show multiple responsive examples next to each other.

```react
responsive: small
span: 3
state: {clicked: 0}
---
<div style={{background: '#ffffff', height: '100%'}}>
  <button onClick={() => setState({clicked: state.clicked + 1})}>
    Clicked {state.clicked < 100 ? state.clicked : 'an unhealthy amount of'} times
  </button>
</div>
```

```react
responsive: ['small', 'medium']
span: 3
state: {clicked: 0}
---
<div style={{background: '#ffffff', height: '100%'}}>
  <button onClick={() => setState({clicked: state.clicked + 1})}>
    Clicked {state.clicked < 100 ? state.clicked : 'an unhealthy amount of'} times
  </button>
</div>
```

