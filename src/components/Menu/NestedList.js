import React, {PropTypes} from 'react';
import {pagesShape} from '../../CatalogPropTypes';

import Link from '../Link/Link';
import ListItem, {style as listItemStyle} from './ListItem';
import {style as menuStyle} from './Menu';
import Radium from 'radium';

const NestedList = ({theme, pages, title}, {router}) => {
  const collapsed = !pages
    .map((d) => d.path && router.isActive(d.path))
    .filter(Boolean)
    .length;

  const currentStyle = {
    ...menuStyle(theme),
    ...listItemStyle(theme)
  };

  return (
    <div>
      <Link
        to={pages[0].path}
        style={{...currentStyle.link, ...(collapsed ? {} : currentStyle.activeLink)}}
        activeStyle={{...currentStyle.link, ...currentStyle.activeLink}} >
        { title }
      </Link>
      { !collapsed &&
        <ul style={{...currentStyle.list, ...currentStyle.listNested, padding: 0}}>
          { pages.map(page => <ListItem key={page.id} page={page} nested theme={theme} />) }
        </ul>
      }
    </div>
  );
};

NestedList.propTypes = {
  pages: pagesShape.isRequired,
  title: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

NestedList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Radium(NestedList);
