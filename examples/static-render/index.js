import render from '../../src/render';
import staticRender from '../../src/staticRender';


const configuration = {
  title: 'My Components',
  pages: [
    {
      path: '/',
      title: 'Foo',
      component: require('./Foo.md')
    },
    {
      path: '/bar',
      title: 'Bar',
      component: require('./Bar.md')
    }
  ],
  useBrowserHistory: true
}

if (typeof document !== "undefined") {
  render(configuration, document.getElementById('app'));
}

module.exports = function(locals, callback) {
  const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36';
  const html = staticRender(locals.path, userAgent, configuration);

  callback(null, `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Catalog</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="${locals.assets.app}"></script>
    </body>
    </html>
  `);
}
