> Use the table specimen to generate simple tables.

This specimen provides an easy way to create tabular content. Table rows are defined using YAML arrays. Cell contents can be formatted using Markdown syntax.

### Props

* **`rows: array`** An array of objects where the property name is the column name and the value is the cell's content
* `columns: array` An array of column names. The order describes the column order from left to right. Columns can be hidden by omitting them from this array

### Examples

#### Basic example

```table
span: 3
rows:
  - Name: Jemaine
    Instrument: Bass among other things
  - Name: Bret
    Instrument: Guitar and piano
```

````code|span-3
```table
span: 3
rows:
  - Name: Jemaine
    Instrument: Bass among other things
  - Name: Bret
    Instrument: Guitar and piano
```
````

#### Markdown formatting

This example uses [Markdown](https://daringfireball.net/projects/markdown/) to format the cell contents. Note that you have to use quotation marks around the cells for this to work.

```table
rows:
  - Term: '**Catalog**'
    Definition: '_n._ A list or itemized display, as of titles, course offerings, or articles for exhibition or sale, usually including descriptive information or illustrations.'
  - Term: ''
    Definition: '_n._ A publication, such as a book or pamphlet, containing such a list or display: a catalog of fall fashions; a seed catalog.'
  - Term: '**Thing**'
    Definition: '_n._ An entity, an idea, or a quality perceived, known, or thought to have its own existence.'
  - Term: ''
    Definition: '_n._ The real or concrete substance of an entity.'
```

````code
```table
rows:
  - Term: '**Catalog**'
    Definition: '_n._ A list or itemized display, …'
  - Term: ''
    Definition: '_n._ A publication, such as a book …'
  - Term: '**Thing**'
    Definition: '_n._ An entity, an idea, or a quality …'
  - Term: ''
    Definition: '_n._ The real or concrete substance of …'
```
````


#### Missing data, ordering and hiding columns

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
