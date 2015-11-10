import React, { PropTypes } from 'react';
import Radium from 'radium';
import {heading} from 'scaffold/typography';

function getStyle(theme) {
  return {
    container: {
      ...heading(theme, {level: 6}),
      display: 'block',
      width: '100%',
      padding: '5px 20px',
      transitionDuration: '.2s',
      transitionProperty: 'border, background',
      borderRadius: 5,
      border: '1px solid' + theme.brandColor,
      background: theme.brandColor,
      color: theme.bgLight,
      textAlign: 'center',
      maxWidth: '100%',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      ':hover': {
        background: theme.textColor,
        border: '1px solid' + theme.textColor
      }
    },
    a: {
      cursor: 'pointer',
      textDecoration: 'none'
    }
  };
}

class Button extends React.Component {
  render() {
    let styles = getStyle(this.props.theme);
    return (
        <a style={[styles.container, styles.a]} href={this.props.url}>
          {this.props.title || this.props.url}
        </a>
    );
  }
}

Button.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  theme: PropTypes.object.isRequired
};

export default Radium(Button);
