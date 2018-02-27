> To link downloadable style guide resources, use the Download Specimen

### Props
- __`url: string`__ The URL pointing to the file
- __`title: string`__ The title for the button
- `filename: string` Changes the file name under which it will be saved
- `subtitle: string` For example the file size
- `span: number[1–6]` width of the specimen

### Examples

#### Basic example

```download
title: Catalog Logo (.svg)
subtitle: 8 KB
url: /assets/catalog_logo.svg
```

````code
```download
title: Catalog Logo (.svg)
subtitle: 8 KB
url: /assets/catalog_logo.svg
```
````

#### Different widths

```download|span-6
{
    "title": "Catalog Logo (.svg)",
    "filename": "catalog-logo",
    "subtitle": "8 KB",
    "url": "/assets/catalog_logo.svg"
}
```
```download|span-3
{
    "title": "Catalog Logo (.svg)",
    "filename": "catalog-logo",
    "subtitle": "8 KB",
    "url": "/assets/catalog_logo.svg"
}
```
```download|span-3
{
    "title": "Catalog Logo with a veeerrryy long title (.svg)",
    "filename": "catalog-logo",
    "subtitle": "8 KB",
    "url": "/assets/catalog_logo.svg"
}
```
```download|span-2
{
    "title": "Catalog Logo (.svg)",
    "filename": "catalog-logo",
    "subtitle": "8 KB",
    "url": "/assets/catalog_logo.svg"
}
```
```download|span-2
{
    "title": "Catalog Logo (.svg)",
    "filename": "catalog-logo",
    "subtitle": "8 KB",
    "url": "/assets/catalog_logo.svg"
}
```
```download|span-2
{
    "title": "Catalog Logo (.svg)",
    "filename": "catalog-logo",
    "subtitle": "8 KB",
    "url": "/assets/catalog_logo.svg"
}
```


````code|collapsed
```download|span-6
{
    "title": "Catalog Logo (.svg)",
    "filename": "catalog-logo",
    "subtitle": "8 KB",
    "url": "/assets/catalog_logo.svg"
}
```
```download|span-3
{
    "title": "Catalog Logo (.svg)",
    "filename": "catalog-logo",
    "subtitle": "8 KB",
    "url": "/assets/catalog_logo.svg"
}
```
```download|span-3
{
    "title": "Catalog Logo (.svg)",
    "filename": "catalog-logo",
    "subtitle": "8 KB",
    "url": "/assets/catalog_logo.svg"
}
```
```download|span-2
{
    "title": "Catalog Logo (.svg)",
    "filename": "catalog-logo",
    "subtitle": "8 KB",
    "url": "/assets/catalog_logo.svg"
}
```
```download|span-2
{
    "title": "Catalog Logo (.svg)",
    "filename": "catalog-logo",
    "subtitle": "8 KB",
    "url": "/assets/catalog_logo.svg"
}
```
```download|span-2
{
    "title": "Catalog Logo with a veeerrryy long title (.svg)",
    "filename": "catalog-logo",
    "subtitle": "8 KB",
    "url": "/assets/catalog_logo.svg"
}
```
````

