import React, { PropTypes } from 'react';
import CatalogPropTypes from '../../CatalogPropTypes';

import Link from '../Link/Link';
import NestedList from './NestedList';
import { text } from '../../scaffold/typography';

export function style(theme) {
  let pseudo = {
    color: theme.sidebarColorTextActive,
    textDecoration: 'none',
    background: 'rgba(255,255,255,0.1)'
  };
  return {
    link: {
      ...text(theme, { level: 2 }),
      borderTop: `1px solid ${theme.sidebarColorLine}`,
      color: theme.sidebarColorText,
      cursor: 'pointer',
      display: 'block',
      margin: 0,
      padding: '16px 40px',
      textDecoration: 'none',
      ':hover': pseudo,
      ':active': pseudo
    },
    activeLink: {
      color: theme.sidebarColorTextActive
    },
    nestedLink: {
      borderTop: 'none',
      borderBottom: 'none',
      padding: '0 24px 16px 60px'
    },
    nestedChildren: {
      borderTop: 'none',
      borderBottom: 'none',
      color: theme.sidebarColorText,
      cursor: 'pointer',
      display: 'block',
      margin: 0,
      padding: '15px 40px',
      textDecoration: 'none'
    }
  };
}

class ListItem extends React.Component {
  render() {
    const { page, theme, nested } = this.props;
    const { path, pages, title, menuTitle } = page;
    let currentStyle = style(theme);
    let defaultStyle = {
      ...currentStyle.link
    };
    if (nested) {
      defaultStyle = {
        ...defaultStyle,
        ...currentStyle.nestedLink
      };
    }
    return (
      <li>
      { pages ?
        <NestedList {...this.props} {...page} pages={pages} /> :
        <Link
          style={defaultStyle}
          activeStyle={currentStyle.activeLink}
          to={path}
          onlyActiveOnIndex={path === '/'}
        >
          { menuTitle || title }
        </Link>
      }
      </li>
    );
  }
}

ListItem.propTypes = {
  page: CatalogPropTypes.page.isRequired,
  theme: PropTypes.object.isRequired,
  nested: PropTypes.bool,
  history: PropTypes.object.isRequired
};

export default ListItem;
