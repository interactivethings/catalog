import React, {PropTypes} from 'react';
import Radium from 'radium';
import {Link as RouterLink} from 'react-router';
import {catalogShape} from '../../CatalogPropTypes';
import {parsePath, isInternalPath} from '../../utils/path';

const RadiumRouterLink = Radium(RouterLink);

const Link = ({to, ...rest}, {catalog}) => {
  return isInternalPath(to, catalog)
    ? <RadiumRouterLink to={parsePath(to, catalog)} {...rest} />
    : <a href={to} {...rest} />;
};

Link.propTypes = {
  to: PropTypes.string.isRequired
};

Link.contextTypes = {
  catalog: catalogShape.isRequired
};

export default Link;
