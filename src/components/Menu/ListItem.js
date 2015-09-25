import React, { PropTypes } from 'react';

import Link from 'components/Link/Link';
import NestedList from './NestedList';
import { text } from 'scaffold/typography';

export function style(theme) {
  let pseudo = {
    color: '#fff',
    textDecoration: 'none',
    background: 'rgba(255,255,255,0.1)'
  };
  return {
    link: {
      ...text(theme, { level: 2 }),
      borderBottom: `1px solid ${theme.brandColorLine}`,
      color: theme.brandColorLight,
      cursor: 'pointer',
      display: 'block',
      margin: 0,
      padding: '15px 40px',
      textDecoration: 'none',
      ':hover': pseudo,
      ':active': pseudo
    },
    activeLink: {
      color: '#fff',
      background: theme.brandColorLine,
      ':hover': undefined
    },
    nestedLink: {
      borderBottom: 'none',
      padding: '5px 40px 5px 20px'
    },
    nestedChildren: {
      borderBottom: 'none',
      color: theme.brandColorLight,
      cursor: 'pointer',
      display: 'block',
      margin: 0,
      padding: '15px 40px',
      textDecoration: 'none'
    }
  };
}

class ListItem extends React.Component {
  static propTypes = {
    pages: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    nested: PropTypes.bool
  }
  render() {
    const { pages, name, title, theme, nested } = this.props;
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
          <NestedList {...this.props} />
          :
          <Link
            style={defaultStyle}
            activeStyle={{...defaultStyle, ...currentStyle.activeLink}}
            to={name}>
            { title }
          </Link>
        }
      </li>
    );
  }
}

export default ListItem;
