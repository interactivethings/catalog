import test from 'tape';
import configure from '../configure';

import DefaultTheme from '../DefaultTheme';
import DefaultSpecimens from '../DefaultSpecimens';

test('Configuration with default theme and specimens', (t) => {
  t.deepEqual(configure({
    title: 'Catalog',
    pages: [
      {
        path: '/',
        title: 'Overview',
        src: 'overview.md'
      }
    ]
  }), {
    __catalogConfig: true,
    title: 'Catalog',
    specimens: DefaultSpecimens,
    theme: DefaultTheme,
    pages: [
      {
        id: 1,
        index: 0,
        path: '/',
        title: 'Overview',
        superTitle: 'Catalog',
        pages: null,
        src: 'overview.md',
        scripts: [],
        styles: []
      }
    ],
    pageTree: [
      {
        id: 1,
        path: '/',
        title: 'Overview',
        superTitle: 'Catalog',
        pages: null,
        src: 'overview.md',
        scripts: [],
        styles: []
      }
    ]
  });
  t.end();
});

test('Configuration with nested pages', (t) => {
  t.deepEqual(configure({
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
  }), {
    __catalogConfig: true,
    title: 'Catalog',
    specimens: DefaultSpecimens,
    theme: DefaultTheme,
    pages: [
      {
        id: 2,
        index: 0,
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
        path: '/bar',
        title: 'Bar',
        superTitle: 'Overview',
        pages: null,
        src: 'bar.md',
        scripts: [],
        styles: []
      }
    ],
    pageTree: [
      {
        id: 1,
        path: '/',
        title: 'Overview',
        superTitle: 'Catalog',
        pages: [
          {
            id: 2,
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
      }
    ]
  });
  t.end();
});
