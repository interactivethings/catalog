import PropTypes from 'prop-types';
import React from 'react';
import {pageShape} from '../../CatalogPropTypes';

import Link from '../Link/Link';
import NestedList from './NestedList';
import {text} from '../../styles/typography';

export function style(theme) {
  const pseudo = {
    color: theme.sidebarColorTextActive,
    textDecoration: 'none',
    background: 'rgba(255,255,255,0.1)'
  };
  return {
    link: {
      ...text(theme),
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
    badge: {
      background: theme.sidebarColorLine,
      border: `1px solid ${theme.sidebarColorLine}`,
      borderRadius: '30%',
      marginLeft: 2,
      paddingLeft: 4,
      paddingRight: 4
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
    const {page, theme, nested} = this.props;
    const {path, pages, title, menuTitle} = page;

    const currentStyle = style(theme);

    const defaultStyle = nested
      ? {...currentStyle.link, ...currentStyle.nestedLink}
      : {...currentStyle.link};

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
  page: pageShape.isRequired,
  theme: PropTypes.object.isRequired,
  nested: PropTypes.bool
};

export default ListItem;
