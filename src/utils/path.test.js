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

test('Parse path with hash', () => {
  expect(parsePath('/foo/bar#baz', mockCatalogConfig)).toEqual({pathname: '/foo/bar', hash: '#baz'});
});

test('Parse path with only hash (pathname is current page)', () => {
  expect(parsePath('#baz', mockCatalogConfig)).toEqual({pathname: '/foo/bar', hash: '#baz'});
});

test('Leave index path alone', () => {
  expect(parsePath('/', mockCatalogConfig)).toEqual({pathname: '/', hash: ''});
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


// Internal paths

test('Internal path', () => {
  expect(isInternalPath('/foo/bar', mockCatalogConfig)).toBe(true);
});

test('Internal path with trailing slash', () => {
  expect(isInternalPath('/foo/bar/', mockCatalogConfig)).toBe(true);
});

test('Parse path with no leading slash', () => {
  expect(parsePath('foo/bar', mockCatalogConfig)).toEqual({pathname: '/foo/bar', hash: ''});
});

test('Internal path with hash', () => {
  expect(isInternalPath('/foo/bar#baz', mockCatalogConfig)).toBe(true);
});

test('Internal path with trailing slash and hash', () => {
  expect(isInternalPath('/foo/bar/#baz', mockCatalogConfig)).toBe(true);
});

test('Internal path with only hash', () => {
  expect(isInternalPath('#baz', mockCatalogConfig)).toBe(true);
});

test('External path', () => {
  expect(isInternalPath('/whoa', mockCatalogConfig)).toBe(false);
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

// Internal paths

test('Internal path basePath set', () => {
  expect(isInternalPath('/foo/bar', mockCatalogConfigWithBasePath)).toBe(true);
});

test('Internal path with basePath set and trailing slash', () => {
  expect(isInternalPath('/foo/bar/', mockCatalogConfigWithBasePath)).toBe(true);
});

test('Internal path with basePath set and hash', () => {
  expect(isInternalPath('/foo/bar#baz', mockCatalogConfigWithBasePath)).toBe(true);
});

test('Internal path with basePath set and trailing slash and hash', () => {
  expect(isInternalPath('/foo/bar/#baz', mockCatalogConfigWithBasePath)).toBe(true);
});

test('Internal path with basePath set and only hash', () => {
  expect(isInternalPath('#baz', mockCatalogConfigWithBasePath)).toBe(true);
});

test('External path with basePath set', () => {
  expect(isInternalPath('/whoa', mockCatalogConfigWithBasePath)).toBe(false);
});

test('Internal path basePath set and basePath', () => {
  expect(isInternalPath('/lalala/foo/bar', mockCatalogConfigWithBasePath)).toBe(true);
});
