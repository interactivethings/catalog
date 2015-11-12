import React, { PropTypes } from 'react';
import CatalogPropTypes from 'CatalogPropTypes';
import { heading, text } from 'scaffold/typography';
import Link from 'components/Link/Link';

import ListItem from './ListItem';

export function style(theme) {
  return {
    bar: {
      background: theme.sidebarColor,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
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
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
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
      padding: 0,
      height: '100%'
    },
    listNested: {
      borderTop: 'none',
      borderBottom: 'none',
      padding: '0 0 15px 40px'
    },
    info: {
      ...text(theme, {level: 4}),
      fontSize: 12,
      padding: 20,
      color: theme.lightColor,
      alignSelf: 'flex-end',
      height: '100%'
    },
    link: {
      color: theme.lightColor
    }
  };
}

class Menu extends React.Component {
  render() {
    const { theme, pageTree, logoSrc, title, history } = this.props;

    let currentStyle = style(theme);

    let titleString = title ? title : '';

    return (
      <div style={currentStyle.bar} >
        <Link to='/' style={{textDecoration: 'none'}}>
          <h1 style={currentStyle.h1}>{logoSrc ? <img style={currentStyle.logo} src={logoSrc} /> : <div style={currentStyle.logo}>{titleString}</div> }</h1>
        </Link>
        <ul style={currentStyle.list}>
          { pageTree.map((page) => <ListItem key={page.id} page={page} theme={theme} history={history} />) }
        </ul>
        <div style={{flex: 1}}/>
        <div style={currentStyle.info}>
          Running on <a style={currentStyle.link} href='http://interactivethings.github.io/catalog' target='_blank'>catalog</a>,
          an Open Source project by <a style={currentStyle.link} href='http://www.interactivethings.com' target='_blank'>Interactive Things</a>.
          Please report issues <a style={currentStyle.link} href='https://github.com/interactivethings/catalog/issues' target='_blank'>here</a>.
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  pageTree: CatalogPropTypes.pages.isRequired,
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
