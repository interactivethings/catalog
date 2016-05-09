import React, { PropTypes } from 'react';
import {pagesShape} from '../../CatalogPropTypes';

import Link from '../Link/Link';
import ListItem, { style as listItemStyle } from './ListItem';
import { style as menuStyle } from './Menu';
import Radium from 'radium';

const NestedList = React.createClass({
  propTypes: {
    pages: pagesShape.isRequired,
    title: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  render() {
    const { theme, pages, title, history } = this.props;
    const collapsed = !pages
      .map((d) => d.path && this.context.router.isActive(d.path))
      .filter(Boolean)
      .length;

    let currentStyle = {
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
            { pages.map(page => <ListItem history={history} key={page.id} page={page} nested theme={theme} />) }
          </ul>
        }
      </div>
    );
  }
});

export default Radium(NestedList);
