# Catalog

> Catalog helps you create beautiful living style guides quickly and easily. Content is written in Markdown so you can focus on documenting your components. It is completely dependency free, making it trivial to integrate Catalog into your application.

Catalog's structure allows you to document colors, typography, elements, and HTML/CSS/JS components of your web project in a beautiful and easy to access format. The design stands back and yet holds enough visual and functional sophistication to provide a great experience to designers, developers, and clients alike.

## Getting started

To get started, look at the provided <a href="#/example">example</a>. If you view source, you will see that you need to load the Catalog CSS and Javascript and then configure it. To get started quickly, you can use one of these hosted versions of Catalog:

<ul><li><a href="http://interactivethings.github.io/catalog/1.0.0-alpha/catalog.js">1.0.0-alpha</a> (<a href="http://interactivethings.github.io/catalog/1.0.0-alpha/catalog.min.js">minified</a>)</li></ul>

For real projects, we recommend to install Catalog using [npm](https://www.npmjs.org/) or [Bower](http://bower.io/).

### Install with npm

```code
npm install --save interactivethings/catalyst.git#1.0.0-alpha
```

### Install with Bower

```code
bower install --save https://github.com/interactivethings/catalyst.git#%VERSION%
```

### Using it on your local machine

Catalog doesn't need anything besides a single Javascript file. However, to run Catalog on your local machine, you will have to use some kind of server due to browser security restrictions (the browser won't be able to load the Markdown files from your local file system). If you don't have an existing server for your project, use something simple like this Python server.

```code
python -m SimpleHTTPServer
```

## More tools

Catalog is a companion product to <a href="http://interactivethings.github.io/catalyst/#/">Catalyst</a>, our very own CSS framework.

