import React, { PropTypes } from 'react';

import { heading } from 'scaffold/typography';

import ListItem from './ListItem';

export function style(theme) {
  return {
    bar: {
      background: theme.sidebarColor
    },
    h1: {
      ...heading(theme, {level: 2}),
      boxSizing: 'border-box',
      color: theme.sidebarColorHeading,
      fontWeight: 600,
      margin: 0,
      padding: `${theme.sizeL}px ${theme.sizeXxl}px`,
      height: theme.pageHeadingHeight
    },
    img: {
      display: 'inline-block',
      width: '100%'
    },
    list: {
      borderTop: `1px solid ${theme.sidebarColorLine}`,
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    listNested: {
      borderTop: 'none',
      borderBottom: `1px solid ${theme.sidebarColorLine}`,
      padding: '0 0 15px 40px'
    }
  };
}

class Menu extends React.Component {
  static propTypes = {
    pages: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      src: PropTypes.string,
      path: PropTypes.string
    })).isRequired,
    theme: PropTypes.object.isRequired,
    logoSrc: PropTypes.string
  }

  static defaultProps = {
    styles: [],
    scripts: []
  }

  render() {
    const { theme, pages, logoSrc, title } = this.props;

    let currentStyle = style(theme);

    return (
      <div style={currentStyle.bar} >
        <h1 style={currentStyle.h1}>{logoSrc ? <img style={currentStyle.img} src={logoSrc} /> : (title ? title : '')}</h1>
        <ul style={currentStyle.list}>
          { pages.map(page => <ListItem key={page.name} {...page} theme={theme} />) }
        </ul>
      </div>
    );
  }
}

export default Menu;
