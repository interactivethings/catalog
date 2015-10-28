import {PropTypes} from 'react';

export const page = PropTypes.shape({
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string,
  src: PropTypes.string,
  pages: PropTypes.arrayOf(page)
});

export const pages = PropTypes.arrayOf(page);
