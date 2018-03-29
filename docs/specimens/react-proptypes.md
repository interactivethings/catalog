> Use the React PropTypes specimen to display a table of propTypes for a given component.

### Props

* **`component: string`** The name of the imported component you wish to display.
* `columns: array` An array of column names. The order describes the column order from left to right. Columns can be hidden by omitting them from this array


### Usage

The React PropTypes specimen utilizes [react-docgen](https://github.com/reactjs/react-docgen) to parse the propTypes for a component. In order to parse the component, react-docgen needs the raw file instead of the transpiled version. To acheive this, import the component with [raw-loader](https://webpack.js.org/loaders/raw-loader/) (which is already included in Catalog's webpack config).

```code
lang: js
---
const pages = [
  {
    path: '/',
    title: 'My React Component',
    component: require('./MyComponent.md'),
    imports: {
      MyComponent: require('!raw-loader!../MyComponent')
    }
  }
];

```

### Examples

#### Basic Example

```react-proptypes
component: MyComponent
```

````
```react-proptypes
component: MyComponent
```
````

#### With Columns
The `columns` property behaves in the same way as [the table specimen's `columns` property](/specimens/table#missing-data-ordering-and-hiding-columns).

```react-proptypes
columns:
  - Required
  - PropType
  - Property
component: MyComponent
```

````
```react-proptypes
columns:
  - Required
  - PropType
  - Property
component: MyComponent
```
````