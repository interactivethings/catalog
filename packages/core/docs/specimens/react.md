> The React Specimen lets you document and build React components.

### Props

- `noSource: boolean` Removes the source code toggle button
- `showSource: boolean` Shows the source code section by default
- `frame: boolean` Wraps output in an `<iframe>` (to prevent style collisions and allow for viewport-relative styling (e.g. using `vw` or `position: fixed`))
- `responsive: boolean | string | array` sets a fixed screen size or allows switching between multiple sizes
- `light: boolean` a light checkered background (default)
- `dark: boolean` a dark checkered background
- `plain: boolean` a transparent background without any padding
- `span: number[1–6]` width of the specimen

```hint|directive
To make your app's components available to the React Specimen, [import them in your configuration](/configuration#imports)
```

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
please refer to the [responsive section](configuration#responsivesizes) on the catalog
configuration page.

#### Display all defined screen sizes

Passing `true` for the responsive prop allows tabbing though all of them.

#### Display only a subset of defined screen sizes

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
---
<div>
<style>{`
.responsive-playground-example {
  font-family: Helvetica;
  margin: auto;
  padding: 24px;
  text-align: center;
  background-color: #c2d8ea; /* ixt-blue-100 */
  color: #003B5C;
}
.responsive-playground-example > h1 {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 12px;
}
.responsive-playground-example > p {
  font-size: 16px;
  padding-bottom: 12px;
}

.grid {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
}
.box {
  flex-grow: 1;
  height: 72px;
  margin-bottom: 12px;
  background-color: #205779;
}
.box:last-child {
  margin: 0;
}

@media (min-width: 1024px) {
  .grid {
    flex-direction: row;
  }
  .box {
    width: 320px;
    height: 144px;
    margin: 0;
    margin-right: 12px;
    background-color: #205779;
  }
  .box:nth-child(2){
    margin: 0;
    margin-bottom: 12px;
  }
}

@media (min-width: 1440px) {
  .responsive-playground-example p {
    padding: 0 16em;
    padding-bottom: 12px;
  }
  .box {
    margin: 0;
    margin-right: 12px;
  }
  .box:nth-child(2){
    margin: 0;
    margin-right: 12px;
  }
}
`}</style>
<div className='responsive-playground-example'>
  <h1>Responsive Grid Example</h1>
  <div className='grid'>
    <div className='box'></div>
    <div className='box'></div>
    <div className='box'></div>
    <div className='box'></div>
  </div>
</div>
</div>
```

````
```react
responsive: true
state: {clicked: 0}
---
<div>
<style>{`
.box {
  background: black;
  width: 100vw;
  height: 100%;
  padding:25px;
  box-sizing: border-box;
  color: white;
  text-align: center;
  font-family: 'Helvetica';
  transition: .7s background;
}
@media (min-width: 360px) {
  .box {
    background: #2BF1D3;
    color: #482AC6;
    text-align: left;
  }
}
@media (min-width: 1024px) {
  .box {
    background: #CED3DF;
    color: #482AC6;
  }
}
@media (min-width: 1440px) {
  .box {
    background: tomato;
    color: purple;
  }
}
@media (min-width: 1920px) {
  .box {
    background: purple;
    color: #2BF1D3;
    font-family: 'Georgia';
  }
}
`}</style>
<div className='box'>
    <h1>Hello World</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</div>
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
