import {render} from 'catalog';

render(
  {
    title: 'Catalog',
    pages: [{path: '/', title: 'Welcome', component: require('./WELCOME.md')}]
  },
  document.getElementById('catalog')
);
