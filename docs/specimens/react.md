> The React Specimen lets you document and build React components.

### Props

- `noSource: boolean` Removes the source code toggle button
- `frame: boolean` Wraps output in an `<iframe>` (to prevent style collisions and allow for viewport-relative styling (e.g. using `vw` or `position: fixed`))
- `responsive: boolean | string | array` sets a fixed screensize or allows switching between multiple sizes
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





### Responsive Display

By defining the 'responsiveSizes' option, you can display a component in various
screen sizes. In order to use sizes other than `small, medium, large` and `xlarge`,
please refer to the [responsive section](configuration#responsive-sizes) on the catalog
configuration page.
dev
#### Displaying all defined screen sizes

Passing `true` for the responsive prop allows tabbing though all of them.


#### Displaying only a subset of defined screen sizes

Passing an array of strings limits the tabs to only those specified, eg. `['small','xlarge']`.

#### Display a single screen size

In order to use a single screen size, you can pass the matching string. Along
with setting a span, it is possible to show two screens next to each other for
direct comparison.




### Examples

#### With State

```react
state: {clicked: 0}
---
<button onClick={() => setState({clicked: state.clicked + 1})}>
  Clicked {state.clicked} times
</button>
```


#### Display all defined screen sizes

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


### Display a single screen size

```react
responsive: small
span: 2
state: {clicked: 0}
---
<div style={{background: '#ffffff', height: '100%'}}>
  <button onClick={() => setState({clicked: state.clicked + 1})}>
    Clicked {state.clicked < 100 ? state.clicked : 'an unhealthy amount of'} times
  </button>
</div>
```

```react
responsive: ['medium', 'xlarge']
span: 4
state: {clicked: 0}
---
<div style={{background: '#ffffff', height: '100%'}}>
  <button onClick={() => setState({clicked: state.clicked + 1})}>
    Clicked {state.clicked < 100 ? state.clicked : 'an unhealthy amount of'} times
  </button>
</div>
```
