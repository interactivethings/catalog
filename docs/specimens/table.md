> Use the table specimen to generate simple tables.

To make writing tabular content easy, tables can be defined using YAML or JSON syntax. Tables support Markdown formatted content.

### Specimen Props

* **`rows: array`** An array of objects where the property name is the column name and the value is the cell's content
* `columns: array` An array of column names. The order describes the column order from left to right. Columns can be hidden by omitting them from this array

### Basic example

This basic example uses Markdown to turn the "ID" column cells bold. Note that you have to use quotation marks around the cell's content for this to work.

```table
span: 2
rows:
  - ID: '**ID-1**'
    Value: '`100`'
  - ID: '**ID-2**'
    Value: '`200`'
```


````code|span-2
YAML definition:

```table
span: 2
rows:
  - ID: '**ID-1**'
    Value: '`100`'
  - ID: '**ID-2**'
    Value: '`200`'
```
````

````code|span-2
JSON definition:

```table
span: 2
rows: [
  {
    ID: '**ID-1**',
    Value: 100
  },
  {
    ID: '**ID-2**',
    Value: 200
  }
]
```
````


### Missing data, ordering and hiding columns

In this example, several things happen:

* Not all rows have the column "Status" defined. This column is added anyway, but cells without data are marked as empty.
* The `columns` property is used to specify the order of the columns. For this example, we want to display the "Status" column last because it can sometimes be empty.
* By omitting the "ID" column name from the `columns` property we hide it.

```table
span: 3
columns:
  - Name
  - Value
  - Status
rows:
  - Status: 'running'
    ID: ID-1
    Value: 100
    Name: A
  - ID: ID-2
    Value: 200
    Name: B
```

````code|span-3
```table
span: 3
columns:
  - Name
  - Value
  - Status
rows:
  - Status: 'running'
    ID: ID-1
    Value: 100
    Name: A
  - ID: ID-2
    Value: 200
    Name: B
```
````
