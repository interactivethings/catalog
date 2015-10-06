import React, { PropTypes } from 'react';

import { line, heading } from 'scaffold/typography';

function style(theme) {
  return {
    bar: {
      background: theme.sidebarColor,
      padding: `${theme.sizeL}px ${theme.sizeXxl}px`
    },
    h1: {
      ...heading(theme, {level: 2}),
      color: theme.sidebarColorHeading,
      fontWeight: 600,
      margin: 0,
      textTransform: 'uppercase'
    },
    img: {
      display: 'inline-block',
      width: '100%'
    }
  };
}

class AppBar extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    logoSrc: PropTypes.string
  }

  render() {
    const { title, logoSrc } = this.props;
    let currentStyle = style(this.props.theme);
    return (
      <div style={currentStyle.bar}>
        <h1 style={currentStyle.h1}>{logoSrc ? <img style={currentStyle.img} src={logoSrc} /> : (title ? title : "")}</h1>
      </div>
    );
  }
}

export default AppBar;
