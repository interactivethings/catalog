import {PropTypes} from 'react';

export const page = PropTypes.shape({
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string,
  src: PropTypes.string,
  pages: PropTypes.array, // should be arrayOf(page) but that doesn't work
  styles: PropTypes.array.isRequired,
  scripts: PropTypes.array.isRequired
});

export const pages = PropTypes.arrayOf(page);
