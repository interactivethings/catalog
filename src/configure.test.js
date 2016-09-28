import configure from './configure';

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
  })).toMatchSnapshot();
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
  })).toMatchSnapshot();
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
    basePath: '/catalog',
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
