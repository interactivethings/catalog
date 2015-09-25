import React, { PropTypes } from 'react';

import { heading } from 'scaffold/typography';

function style(theme) {
  return {
    bar: {
      background: theme.brandColor,
      padding: `${theme.sizeL}px ${theme.sizeXxl}px`
    },
    h1: {
      ...heading(theme, {level: 2}),
      color: theme.brandColorDark,
      fontWeight: 600,
      margin: 0,
      textTransform: 'uppercase'
    }
  };
}

class AppBar extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired
  }
  render() {
    const { title } = this.props;
    let currentStyle = style(this.props.theme);
    return (
      <div style={currentStyle.bar}>
        <h1 style={currentStyle.h1}>{title}</h1>
      </div>
    );
  }
}

export default AppBar;
