import React, { PropTypes } from 'react';
import CatalogPropTypes from 'core/PropTypes';
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
      height: theme.pageHeadingHeight,
      display: 'flex',
      alignItems: 'bottom',
      justifyContent: 'left'
    },
    logo: {
      display: 'inline-block',
      width: '100%',
      alignSelf: 'flex-end',
      paddingBottom: '45px'
    },
    list: {
      borderBottom: `1px solid ${theme.sidebarColorLine}`,
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    listNested: {
      borderTop: 'none',
      borderBottom: 'none',
      padding: '0 0 15px 40px'
    }
  };
}

class Menu extends React.Component {
  render() {
    const { theme, pages, logoSrc, title, history } = this.props;

    let currentStyle = style(theme);

    let titleString = title ? title : '';

    return (
      <div style={currentStyle.bar} >
        <h1 style={currentStyle.h1}>{logoSrc ? <img style={currentStyle.logo} src={logoSrc} /> : <div  style={currentStyle.logo}>{titleString}</div> }</h1>
        <ul style={currentStyle.list}>
          { pages.map(page => <ListItem key={page.name} page={page} theme={theme} history={history} />) }
        </ul>
      </div>
    );
  }
}

Menu.propTypes = {
  pages: CatalogPropTypes.pages.isRequired,
  theme: PropTypes.object.isRequired,
  logoSrc: PropTypes.string,
  history: PropTypes.object.isRequired,
  title: PropTypes.string
};

Menu.defaultProps = {
  styles: [],
  scripts: []
};

export default Menu;
