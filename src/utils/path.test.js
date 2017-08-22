import {parsePath, isInternalPath} from './path';

const mockCatalogConfig = {
  basePath: '/',
  useBrowserHistory: true,
  pagePaths: new Set(['/', '/foo/bar']),
  page: {
    path: '/foo/bar'
  }
};

test('Parse path', () => {
  expect(parsePath('/foo/bar', mockCatalogConfig)).toEqual({pathname: '/foo/bar', hash: ''});
});

test('Parse path with trailing slash', () => {
  expect(parsePath('/foo/bar/', mockCatalogConfig)).toEqual({pathname: '/foo/bar', hash: ''});
});

test('Parse path with no leading slash', () => {
  expect(parsePath('foo/bar', mockCatalogConfig)).toEqual({pathname: '/foo/bar', hash: ''});
});

test('Parse path with hash', () => {
  expect(parsePath('/foo/bar#baz', mockCatalogConfig)).toEqual({pathname: '/foo/bar', hash: '#baz'});
});

test('Parse path with only hash (pathname is current page)', () => {
  expect(parsePath('#baz', mockCatalogConfig)).toEqual({pathname: '/foo/bar', hash: '#baz'});
});

test('Leave index path alone', () => {
  expect(parsePath('/', mockCatalogConfig)).toEqual({pathname: '/', hash: ''});
});

test('Parse external path', () => {
  expect(parsePath('/assets/foo.png', mockCatalogConfig)).toEqual({pathname: '/assets/foo.png', hash: ''});
  expect(parsePath('foo.html', mockCatalogConfig)).toEqual({pathname: '/foo.html', hash: ''});
  expect(parsePath('bar', mockCatalogConfig)).toEqual({pathname: '/bar', hash: ''});
});

test('Do not parse URL', () => {
  expect(parsePath('https://example.com/foo.png', mockCatalogConfig)).toEqual({pathname: 'https://example.com/foo.png', hash: ''});
});

const mockCatalogConfigWithHashHistory = {
  basePath: '',
  useBrowserHistory: false,
  pagePaths: new Set(['/', '/foo/bar']),
  page: {
    path: '/foo/bar'
  }
};

test('Hash history: Parse path', () => {
  expect(parsePath('/foo/bar', mockCatalogConfigWithHashHistory)).toEqual({pathname: '/foo/bar', query: {}});
});

test('Hash history: Parse path with trailing slash', () => {
  expect(parsePath('/foo/bar/', mockCatalogConfigWithHashHistory)).toEqual({pathname: '/foo/bar', query: {}});
});

test('Hash history: Parse path with hash', () => {
  expect(parsePath('/foo/bar#baz', mockCatalogConfigWithHashHistory)).toEqual({pathname: '/foo/bar', query: {a: 'baz'}});
});

test('Hash history: Parse path with only hash (pathname is current page)', () => {
  expect(parsePath('#baz', mockCatalogConfigWithHashHistory)).toEqual({pathname: '/foo/bar', query: {a: 'baz'}});
});

test('Hash history: Parse external path', () => {
  expect(parsePath('/assets/foo.png', mockCatalogConfigWithHashHistory)).toEqual({pathname: '/assets/foo.png', query: {}});
  expect(parsePath('foo.html', mockCatalogConfigWithHashHistory)).toEqual({pathname: '/foo.html', query: {}});
  expect(parsePath('bar', mockCatalogConfigWithHashHistory)).toEqual({pathname: '/bar', query: {}});
});

test('Hash history: Do not parse URL', () => {
  expect(parsePath('https://example.com/foo.png', mockCatalogConfigWithHashHistory)).toEqual({pathname: 'https://example.com/foo.png', query: {}});
});

// Internal paths

test('Internal path', () => {
  expect(isInternalPath(parsePath('/foo/bar', mockCatalogConfig), mockCatalogConfig)).toBe(true);
});

test('Internal path with trailing slash', () => {
  expect(isInternalPath(parsePath('/foo/bar/', mockCatalogConfig), mockCatalogConfig)).toBe(true);
});

test('Internal path with hash', () => {
  expect(isInternalPath(parsePath('/foo/bar#baz', mockCatalogConfig), mockCatalogConfig)).toBe(true);
});

test('Internal path with trailing slash and hash', () => {
  expect(isInternalPath(parsePath('/foo/bar/#baz', mockCatalogConfig), mockCatalogConfig)).toBe(true);
});

test('Internal path with only hash', () => {
  expect(isInternalPath(parsePath('#baz', mockCatalogConfig), mockCatalogConfig)).toBe(true);
});

test('External path', () => {
  expect(isInternalPath(parsePath('/whoa', mockCatalogConfig), mockCatalogConfig)).toBe(false);
});


// Base path

const mockCatalogConfigWithBasePath = {
  basePath: '/lalala',
  useBrowserHistory: true,
  pagePaths: new Set(['/lalala', '/lalala/foo/bar']),
  page: {
    path: '/lalala/foo/bar'
  }
};

test('Parse path with basePath set', () => {
  expect(parsePath('/foo/bar', mockCatalogConfigWithBasePath)).toEqual({pathname: '/lalala/foo/bar', hash: ''});
});

test('Parse path with basePath set and basePath', () => {
  expect(parsePath('/lalala/foo/bar', mockCatalogConfigWithBasePath)).toEqual({pathname: '/lalala/foo/bar', hash: ''});
});

test('Parse path with basePath set and trailing slash', () => {
  expect(parsePath('/foo/bar/', mockCatalogConfigWithBasePath)).toEqual({pathname: '/lalala/foo/bar', hash: ''});
});

test('Parse path with basePath set and no leading slash', () => {
  expect(parsePath('foo/bar', mockCatalogConfigWithBasePath)).toEqual({pathname: '/lalala/foo/bar', hash: ''});
});

test('Parse path with basePath set and hash', () => {
  expect(parsePath('/foo/bar#baz', mockCatalogConfigWithBasePath)).toEqual({pathname: '/lalala/foo/bar', hash: '#baz'});
});

test('Parse path with basePath set and only hash (pathname is current page)', () => {
  expect(parsePath('#baz', mockCatalogConfigWithBasePath)).toEqual({pathname: '/lalala/foo/bar', hash: '#baz'});
});

test('Leave index path alone with basePath set', () => {
  expect(parsePath('/lalala', mockCatalogConfigWithBasePath)).toEqual({pathname: '/lalala', hash: ''});
});

test('Parse external path with basePath set', () => {
  expect(parsePath('/assets/foo.png', mockCatalogConfigWithBasePath)).toEqual({pathname: '/lalala/assets/foo.png', hash: ''});
  expect(parsePath('foo.html', mockCatalogConfigWithBasePath)).toEqual({pathname: '/lalala/foo.html', hash: ''});
  expect(parsePath('bar', mockCatalogConfigWithBasePath)).toEqual({pathname: '/lalala/bar', hash: ''});
});

test('Do not parse URL with basePath set', () => {
  expect(parsePath('https://example.com/foo.png', mockCatalogConfigWithBasePath)).toEqual({pathname: 'https://example.com/foo.png', hash: ''});
});


// Internal paths

test('Internal path basePath set', () => {
  expect(isInternalPath(parsePath('/foo/bar', mockCatalogConfigWithBasePath), mockCatalogConfigWithBasePath)).toBe(true);
});

test('Internal path with basePath set and trailing slash', () => {
  expect(isInternalPath(parsePath('/foo/bar/', mockCatalogConfigWithBasePath), mockCatalogConfigWithBasePath)).toBe(true);
});

test('Internal path with basePath set and hash', () => {
  expect(isInternalPath(parsePath('/foo/bar#baz', mockCatalogConfigWithBasePath), mockCatalogConfigWithBasePath)).toBe(true);
});

test('Internal path with basePath set and trailing slash and hash', () => {
  expect(isInternalPath(parsePath('/foo/bar/#baz', mockCatalogConfigWithBasePath), mockCatalogConfigWithBasePath)).toBe(true);
});

test('Internal path with basePath set and only hash', () => {
  expect(isInternalPath(parsePath('#baz', mockCatalogConfigWithBasePath), mockCatalogConfigWithBasePath)).toBe(true);
});

test('External path with basePath set', () => {
  expect(isInternalPath(parsePath('/whoa', mockCatalogConfigWithBasePath), mockCatalogConfigWithBasePath)).toBe(false);
});

test('Internal path basePath set and basePath', () => {
  expect(isInternalPath(parsePath('/lalala/foo/bar', mockCatalogConfigWithBasePath), mockCatalogConfigWithBasePath)).toBe(true);
});
