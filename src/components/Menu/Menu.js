import React, {PropTypes} from 'react';
import {pagesShape} from '../../CatalogPropTypes';
import {heading, text, getFontSize} from '../../styles/typography';
import Link from '../Link/Link';

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
      ...heading(theme, 1),
      boxSizing: 'border-box',
      color: theme.sidebarColorHeading,
      fontWeight: 700,
      margin: 0,
      padding: `${theme.sizeL}px ${theme.sizeXxl}px`,
      height: theme.pageHeadingHeight,
      display: 'flex',
      alignItems: 'flex-end'
    },
    logo: {
      maxWidth: '100%',
      maxHeight: `calc(100% - ${getFontSize(theme, 5)})`,
      marginBottom: getFontSize(theme, 5)
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
    },
    info: {
      ...text(theme, -1),
      padding: 20,
      color: theme.lightColor
    },
    link: {
      color: theme.lightColor
    }
  };
}

class Menu extends React.Component {
  render() {
    const {theme, pageTree, logoSrc, title, history, basePath} = this.props;

    const currentStyle = style(theme);

    const titleString = title ? title : '';

    return (
      <div style={currentStyle.bar} >
        <div style={{flexGrow: 1}}>
          <Link to={basePath} style={{textDecoration: 'none'}}>
            <h1 style={currentStyle.h1}>{logoSrc ? <img style={currentStyle.logo} src={logoSrc} /> : <div style={currentStyle.logo}>{titleString}</div> }</h1>
          </Link>
          <ul style={currentStyle.list}>
            { pageTree.filter((page) => !page.hideFromMenu).map((page) => <ListItem key={page.id} page={page} theme={theme} history={history} />) }
          </ul>
        </div>
        <div style={currentStyle.info}>
          Powered by <a style={currentStyle.link} href='http://interactivethings.github.io/catalog' target='_blank'>Catalog</a>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  pageTree: pagesShape.isRequired,
  theme: PropTypes.object.isRequired,
  logoSrc: PropTypes.string,
  history: PropTypes.object.isRequired,
  basePath: PropTypes.string,
  title: PropTypes.string
};

Menu.defaultProps = {
  styles: [],
  scripts: []
};

export default Menu;
