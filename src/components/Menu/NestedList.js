import React, { PropTypes } from 'react';
import { State } from 'react-router';

import Link from 'components/Link/Link';
import ListItem, { style as listItemStyle } from './ListItem';
import { style as menuStyle } from './Menu';
import Radium from 'radium';

const NestedList = React.createClass({
  mixins: [State],
  propTypes: {
    pages: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired
  },
  render() {
    const { theme, pages, title } = this.props;
    const collapsed = !pages
      .map((d) => this.isActive(d.name))
      .filter(Boolean)
      .length;

    let currentStyle = {
      ...menuStyle(theme),
      ...listItemStyle(theme)
    };

    return (
      <div>
        <Link
          to={pages[0].path || pages[0].name}
          style={[currentStyle.link, collapsed ? {} : currentStyle.activeLink]}
          activeStyle={{...currentStyle.link, ...currentStyle.activeLink}} >
          { title }
        </Link>
        { !collapsed &&
          <ul style={[currentStyle.list, currentStyle.listNested, {padding: 0}]}>
            { pages.map(page => <ListItem key={page.name} {...page} nested theme={theme} />) }
          </ul>
        }
      </div>
    );
  }
});

export default Radium(NestedList);
