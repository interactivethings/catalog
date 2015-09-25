import React, { PropTypes } from 'react';

import ListItem from './ListItem';

export function style(theme) {
  return {
    list: {
      borderTop: `1px solid ${theme.brandColorLine}`,
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    listNested: {
      borderTop: 'none',
      borderBottom: `1px solid ${theme.brandColorLine}`,
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
    theme: PropTypes.object.isRequired
  }
  static defaultProps = {
    styles: [],
    scripts: []
  }
  render() {
    const { theme, pages } = this.props;

    let currentStyle = style(theme);
    return (
      <div>
        <ul style={currentStyle.list}>
          { pages.map(page => <ListItem key={page.name} {...page} theme={theme} />) }
        </ul>
      </div>
    );
  }
}

export default Menu;
