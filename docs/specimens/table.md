The table specimen allows to generate tables easily. You can of course use Markdown tables, but the notation can get a bit tedious.


```table
rows:
  - {Prop: '__rows__', required: 'yes', Type: '_array_', Description: 'An array containg the data key/value objects.'}
  - {Prop: 'columns', Type: '_array_', Description: 'An array that allows ordering and filtering the columns.'}

```


### Basic example

A basic table can be generated like this:

```table
span: 3
rows:
  - { ID: '#1', Value: 100 }
  - { ID: '#2', Value: 200 }
```

````code|span-3
```table
span: 3
rows:
  - { ID: '#1', Value: 100 }
  - { ID: '#2', Value: 200 }
```
````


### Missing data and order

If a key is not present in the other objects, the column gets added and the omitted cells are marked as empty.
Note that the key order is not relevant, so there is one thing less to worry about.

```table
span: 3
rows:
  - { ID: '#1', Value: 100 }
  - { Value: 200, ID: '#2' }
  - { ID: '#3', Value: 300, Note: 'running' }
```


````code|span-3
```table
span: 3
rows:
  - { ID: '#1', Value: 100 }
  - { Value: 200, ID: '#2' }
  - { ID: '#3', Value: 300, Note: 'running' }
```
````

### Sort and filter the columns

If there is a need to remove a column or change their order, you can pass the optional `columns` array.

```table
span: 3
columns: [Value, ID]
rows:
  - { ID: '#1', Value: 100 }
  - { Value: 200, ID: '#2' }
  - { Value: 300, ID: '#3', Note: 'running' }
```

````code|span-3
```table
span: 3
columns: [Value, ID]
rows:
  - { ID: '#1', Value: 100 }
  - { Value: 200, ID: '#2' }
  - { Value: 300, ID: '#3', Note: 'running' }
```
````
