# Catalog

> Catalog helps you create beautiful living style guides quickly and easily. Content is written in Markdown so you can focus on documenting your components. It is completely dependency free, making it trivial to integrate Catalog into your application.

Catalog's structure allows you to document colors, typography, elements, and HTML/CSS/JS components of your web project in a beautiful and easy to access format. The design stands back and yet holds enough visual and functional sophistication to provide a great experience to designers, developers, and clients alike.

## Getting started

To get started, look at the provided [example](#/example). If you view source, you will see that you need to load the Catalog CSS and Javascript and then configure it. To get started quickly, you can use one of these hosted versions of Catalog:

* Catalog %VERSION%: [production](http://interactivethings.github.io/catalog/%VERSION%/catalog.min.js), [development](http://interactivethings.github.io/catalog/%VERSION%/catalog.js)
* Nightly build: [experimental](http://interactivethings.github.io/catalog/catalog.js)

For real projects, we recommend to install Catalog using [npm](https://www.npmjs.org/) or [Bower](http://bower.io/).

### Install with npm

```code
npm install --save interactivethings/catalog.git#%VERSION%
```

### Install with Bower

```code
bower install --save https://github.com/interactivethings/catalog.git#%VERSION%
```

### Download source code

Go to Github to download the [source code](https://github.com/interactivethings/catalog/).

### Using it on your local machine

Catalog doesn't need anything besides a single Javascript file. However, to run Catalog on your local machine, you will have to use some kind of server due to browser security restrictions (the browser won't be able to load the Markdown files from your local file system). If you don't have an existing server for your project, use something simple like this Python server.

```code
python -m SimpleHTTPServer
```

## More tools

Catalog is a companion product to [Catalyst](http://interactivethings.github.io/catalyst/), our very own CSS framework.

