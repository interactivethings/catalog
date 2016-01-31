import {render} from '../../src/index';

import Foo from './components/Foo/Foo';

render({
  title: 'My Components',
  imports: {Foo},
  pages: [
    {
      path: '/',
      title: 'Foo',
      component: require('./components/Foo/README.md')
    },
    {
      path: '/bar',
      title: 'FooBar',
      src: './components/Foo/README.md'
    }
  ]
}, document.getElementById('app'));
