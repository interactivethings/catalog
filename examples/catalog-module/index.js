import {render} from '../../src/index';

render({
  title: 'My Components',
  pages: [
    {
      path: '/',
      title: 'Foo',
      imports: {Foo: require('./components/Foo/Foo')},
      component: require('./components/Foo/Foo.docs.md')
    }
  ]
}, document.getElementById('app'));
