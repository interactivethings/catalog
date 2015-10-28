import React, { PropTypes } from 'react';
import {pages} from 'core/PropTypes';

import Link from 'components/Link/Link';
import ListItem, { style as listItemStyle } from './ListItem';
import { style as menuStyle } from './Menu';
import Radium from 'radium';

const NestedList = React.createClass({
  propTypes: {
    pages: pages.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  },
  render() {
    const { theme, pages, title, history } = this.props;
    const collapsed = !pages
      .map((d) => d.path && this.props.history.isActive(d.path))
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
          style={[currentStyle.link, collapsed ? {} : currentStyle.activeLink]}
          activeStyle={{...currentStyle.link, ...currentStyle.activeLink}} >
          { title }
        </Link>
        { !collapsed &&
          <ul style={[currentStyle.list, currentStyle.listNested, {padding: 0}]}>
            { pages.map(page => <ListItem history={history} key={page.name} page={page} nested theme={theme} />) }
          </ul>
        }
      </div>
    );
  }
});

export default Radium(NestedList);
