> The React Specimen lets you document and build React components.


## Plain

Just write JSX code in the specimen content.

````
```react
<MyCoolComponent>My cool component</MyCoolComponent>
```
````

## With State

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
