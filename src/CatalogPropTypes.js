import {PropTypes} from 'react';

export const pageShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number,
  path: PropTypes.string,
  src: PropTypes.string,
  pages: PropTypes.array, // should be arrayOf(page) but that doesn't work
  styles: PropTypes.array.isRequired,
  scripts: PropTypes.array.isRequired,
  imports: PropTypes.object.isRequired,
  basePath: PropTypes.string
});

export const pagesShape = PropTypes.arrayOf(pageShape);

export const catalogShape = PropTypes.shape({
  page: pageShape.isRequired,
  getSpecimen: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  pages: pagesShape.isRequired,
  pageTree: pagesShape.isRequired,
  logoSrc: PropTypes.string,
  basePath: PropTypes.string
});
