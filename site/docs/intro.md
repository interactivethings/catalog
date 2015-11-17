> Catalog helps you create beautiful living style guides quickly and easily. Content is written in Markdown so you can focus on documenting your project with clarity. It is completely dependency free, making it trivial to integrate into any application.

That last bit is where Catalog really shines. There are many great tools out there to build living style guides, but most of them depend on a build step, which is in turn dependent on a specific technology. We like to use the right tool for the job: in some cases that might be Rails or Node.js or PHP or just plain HTML. Catalog works effortlessly with all of these technologies.

Use Catalog to document HTML and CSS, colors, typography, and even interactive components of your web project in a beautiful and easy to access format. The design stands back and yet holds enough visual and functional sophistication to provide a great experience to designers, developers, and clients alike.

## Getting started

To get started, look at the provided [example](#/example). If you view source, you will see that you need to load the Catalog CSS and Javascript and then configure it. To get started quickly, you can use one of these hosted versions of Catalog:

* 2.0.0-alpha3 Standalone: [production](https://npmcdn.com/catalog@2.0.0-alpha3/catalog.min.js), [development](https://npmcdn.com/catalog/catalog.js)
* 2.0.0-alpha3 without React: [production](https://npmcdn.com/catalog@2.0.0-alpha3/catalog-lib.min.js), [development](https://npmcdn.com/catalog/catalog-lib.js)

For real projects, we recommend to install Catalog using [npm](https://www.npmjs.org/).

#### Install with npm

```code
npm install --save catalog
```

#### Download source code

Go to Github to download the [source code](https://github.com/interactivethings/catalog/).

#### Using it on your local machine

Catalog doesn't need anything besides a single Javascript file. However, to run Catalog on your local machine, you will have to use some kind of server due to browser security restrictions (the browser won't be able to load the Markdown files from your local file system). If you don't have an existing server for your project, use something simple like this Python server.

```code
python -m SimpleHTTPServer
```

## More tools

Catalog is a companion product to [Catalyst](http://interactivethings.github.io/catalyst/), our very own CSS framework.

