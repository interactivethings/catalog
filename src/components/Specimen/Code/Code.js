import React, { PropTypes } from 'react';

function getStyle(theme) {
  return {
    container: {
      borderRadius: '2px',
      boxSizing: 'border-box',
      display: 'block',
      margin: '10px 0',
      padding: '20px',
      width: '100%',
      height: 'auto',

      background: '#fff',
      border: '1px solid #eee',
      color: theme.textColor,
      fontFamily: theme.fontMono,
      fontSize: theme.fontXs,
      lineHeight: 1.4,
      overflowX: 'scroll',
      whiteSpace: 'pre'
    }
  };
}

class Code extends React.Component {
  render() {
    const {theme, body} = this.props;
    let styles = getStyle(theme);
    return <section style={styles.container} dangerouslySetInnerHTML={{__html: body}}/>;
  }
}

Code.propTypes = {
  body: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default Code;
