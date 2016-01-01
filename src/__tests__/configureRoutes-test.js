import test from 'tape';
import configure from '../configure';
import configureRoutes from '../configureRoutes';

test('Pre-Configuration', (t) => {
  const routes = configureRoutes(configure({
    title: 'Catalog',
    pages: [
      {
        path: '/',
        title: 'Overview',
        pages: [
          {
            path: 'foo',
            title: 'Foo',
            src: 'foo.md'
          },
          {
            path: 'bar',
            title: 'Bar',
            src: 'bar.md'
          }
        ]
      }
    ]
  }));

  t.equal(routes.childRoutes.length, 2);
  t.equal(routes.childRoutes[0].path, '/foo');
  t.end();
});

test('Auto-Configuration', (t) => {
  const routes = configureRoutes({
    title: 'Catalog',
    pages: [
      {
        path: '/',
        title: 'Overview',
        pages: [
          {
            path: 'foo',
            title: 'Foo',
            src: 'foo.md'
          },
          {
            path: 'bar',
            title: 'Bar',
            src: 'bar.md'
          }
        ]
      }
    ]
  });

  t.equal(routes.childRoutes.length, 2);
  t.equal(routes.childRoutes[0].path, '/foo');
  t.end();
});

// test('String without options', (t) => {
//   t.equal(parseSpecimenType('html'), 'html');
//   t.end();
// });

// test('String before | is specimen type', (t) => {
//   t.equal(parseSpecimenType('html|no-source'), 'html');
//   t.end();
// });

// test('Specimen type is always lower-cased', (t) => {
//   t.equal(parseSpecimenType('HtmL'), 'html');
//   t.end();
// });

