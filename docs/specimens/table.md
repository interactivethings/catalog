The table specimen allows to generate tables easily.


```table
rows:
  - Prop: __`rows`__
    required: yes
    Type: _array_
    Description:  'An array containg the data key/value objects.'

  - Prop: '`columns`'
    Type: _array_
    Description:  'An array that allows ordering and filtering the columns.'

```


### Basic example

To generate a basic table, you can define `rows` using YAML and/or JSON. Additionaly, the values can be notated using Markdown syntax.

```table
span: 3
rows:
  - ID: __ID-1__
    Value: '`100`'
  - ID: __ID-2__
    Value: '`200`'
```


````code|span-3
```table
span: 3
rows:
  - ID: __ID-1__
    Value: '`100`'
  - ID: __ID-2__
    Value: '`200`'
```

// or 

```table
span: 3
rows: [{ ID: '__ID-1__', Value: 100 }, { ID: '__ID-2__', Value: 200 }]
```
````


### Missing data, ordering and filtering columns

If a key is not present in the other objects, the column gets added and the omitted cells are marked as empty.
Note that the key order for each row is not important as they are sorted by occurence. So there is one thing less to worry about.

You however can change the order manually, with the optional `columns` array. 

In the following example, the 'Status' column would be the first, which is probably not what you want.
Also, the 'Notes' column does not contain any useful information.

The `columns` array takes care of that through setting the order and filtering the relevant columns.


```table
span: 3
columns:
  - ID
  - Value
  - Status
rows:
  - Status: 'running'
    ID: ID-1
    Value: 100
    Notes: 
  - ID: ID-2
    Value: 200
    Notes:
```


````code|span-3
```table
span: 3
columns:
  - ID
  - Value
  - Status
rows:
  - Status: 'running'
    ID: ID-1
    Value: 100
    Notes: 
  - ID: ID-2
    Value: 200
    Notes:
```
````
