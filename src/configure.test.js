import configure from './configure';

import DefaultTheme from './DefaultTheme';
import specimens from './specimens';
import NotFound from './components/Page/NotFound';

test('Configuration with default theme and specimens', () => {
  expect(configure({
    title: 'Catalog',
    pages: [
      {
        path: '/',
        title: 'Overview',
        src: 'overview.md'
      }
    ]
  })).toEqual({
    __catalogConfig: true,
    basePath: '/',
    title: 'Catalog',
    specimens: specimens,
    theme: DefaultTheme,
    pages: [
      {
        id: 1,
        index: 0,
        imports: {},
        path: '/',
        title: 'Overview',
        superTitle: 'Catalog',
        pages: null,
        src: 'overview.md',
        scripts: [],
        styles: []
      },
      {
        path: '/*',
        id: 2,
        component: NotFound,
        title: 'Page Not Found',
        superTitle: 'Catalog',
        scripts: [],
        styles: [],
        imports: {},
        hideFromMenu: true
      }
    ],
    pageTree: [
      {
        id: 1,
        imports: {},
        path: '/',
        title: 'Overview',
        superTitle: 'Catalog',
        pages: null,
        src: 'overview.md',
        scripts: [],
        styles: []
      },
      {
        path: '/*',
        id: 2,
        component: NotFound,
        title: 'Page Not Found',
        superTitle: 'Catalog',
        scripts: [],
        styles: [],
        imports: {},
        hideFromMenu: true
      }
    ]
  });
});

test('Configuration with nested pages', () => {
  expect(configure({
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
  })).toEqual({
    __catalogConfig: true,
    basePath: '/',
    title: 'Catalog',
    specimens: specimens,
    theme: DefaultTheme,
    pages: [
      {
        id: 2,
        index: 0,
        imports: {},
        path: '/foo',
        title: 'Foo',
        superTitle: 'Overview',
        pages: null,
        src: 'foo.md',
        scripts: [],
        styles: []
      },
      {
        id: 3,
        index: 1,
        imports: {},
        path: '/bar',
        title: 'Bar',
        superTitle: 'Overview',
        pages: null,
        src: 'bar.md',
        scripts: [],
        styles: []
      },
      {
        path: '/*',
        id: 4,
        component: NotFound,
        title: 'Page Not Found',
        superTitle: 'Catalog',
        scripts: [],
        styles: [],
        imports: {},
        hideFromMenu: true
      }
    ],
    pageTree: [
      {
        id: 1,
        imports: {},
        path: '/',
        title: 'Overview',
        superTitle: 'Catalog',
        pages: [
          {
            id: 2,
            imports: {},
            path: '/foo',
            title: 'Foo',
            superTitle: 'Overview',
            pages: null,
            src: 'foo.md',
            scripts: [],
            styles: []
          },
          {
            id: 3,
            imports: {},
            path: '/bar',
            title: 'Bar',
            superTitle: 'Overview',
            pages: null,
            src: 'bar.md',
            scripts: [],
            styles: []
          }
        ],
        scripts: [],
        styles: []
      },
      {
        path: '/*',
        id: 4,
        component: NotFound,
        title: 'Page Not Found',
        superTitle: 'Catalog',
        scripts: [],
        styles: [],
        imports: {},
        hideFromMenu: true
      }
    ]
  });
});

test('Imports are merged on pages', () => {
  const config = configure({
    title: 'Catalog',
    imports: {Foo: 'Foo'},
    pages: [
      {
        path: '/',
        title: 'Overview',
        imports: {Bar: 'Bar'},
        src: 'overview.md'
      }
    ]
  });

  expect(config.pages[0].imports).toEqual({Foo: 'Foo', Bar: 'Bar'});
});

test('basePath support', () => {
  const config = configure({
    title: 'Catalog',
    basePath: 'catalog',
    pages: [
      {
        path: '/',
        title: 'Overview',
        src: 'overview.md'
      }
    ]
  });

  expect(config.pages[0].path).toBe('/catalog');
  // Fallback page
  expect(config.pages[1].path).toBe('/catalog/*');
});
