import React, { PropTypes, Component } from 'react';
import Radium from 'radium';
import Specimen from '../components/Specimen/Specimen';
import {heading} from '../scaffold/typography';

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

class Button extends Component {
  render() {
    const {theme, body: {url, title}} = this.props;
    let styles = getStyle(theme);

    return (
        <a style={[styles.container, styles.a]} href={url}>
          {title || url}
        </a>
    );
  }
}

Button.propTypes = {
  theme: PropTypes.object.isRequired,
  body: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string
  })
};

export default Specimen(Radium(Button));
