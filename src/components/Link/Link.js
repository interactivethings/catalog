import React, {PropTypes} from 'react';
import Radium from 'radium';
import {Link as RouterLink} from 'react-router';
import {catalogShape} from '../../CatalogPropTypes';

const external = /^https?:\/\//;
const internalLink = /^(.*?)#(.+)$/;

const createInternalLink = (link, catalog) => {
  const matches = internalLink.exec(link);

  // With browserHistory
  // /foo#bar => /foo#bar
  // #bar     => /foo#bar

  // Without browserHistory
  // /foo#bar => /foo?a=bar
  // #bar     => /foo?a=bar
  if (matches) {
    const [, path, anchor] = matches;
    // Include current page path if none is given
    const pathname = path || catalog.page.path;

    // TODO validate internal links by exposing all existing paths to config

    return catalog.useBrowserHistory
      ? {pathname, hash: `#${anchor}`}
      : {pathname, query: {a: anchor}};
  }
  
  // If all of the above fails (e.g. on /foo)
  return link;
};

const RadiumRouterLink = Radium(RouterLink);

const Link = ({to, ...rest}, {catalog}) => {
  return external.test(to)
    ? <a href={to} {...rest} />
    : <RadiumRouterLink to={createInternalLink(to, catalog)} {...rest} />;
};

Link.propTypes = {
  to: PropTypes.string.isRequired
};

Link.contextTypes = {
  catalog: catalogShape.isRequired
};

export default Link;
