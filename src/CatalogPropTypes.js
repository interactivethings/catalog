import PropTypes from "prop-types";

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
  hideFromMenu: PropTypes.boolean
});

export const pagesShape = PropTypes.arrayOf(pageShape);

export const catalogShape = PropTypes.shape({
  basePath: PropTypes.string.isRequired,
  publicUrl: PropTypes.string.isRequired,
  page: pageShape.isRequired,
  getSpecimen: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  responsiveSizes: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  pages: pagesShape.isRequired,
  pageTree: pagesShape.isRequired,
  pagePaths: PropTypes.instanceOf(Set).isRequired,
  logoSrc: PropTypes.string
});
