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
