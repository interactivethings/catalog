import React, { PropTypes } from 'react';
import Radium from 'radium';

import downloadIconSrc from 'assets/download-icon.svg';

function getStyle(theme) {
  return {
    container: {
      display: 'block',
      width: '100%',
      height: 120,
      background: theme.background,
      transition: '.4s background',
      ':hover': {
        background: theme.bgLight
      }
    },
    a: {
      cursor: 'pointer',
      display: 'block'
    },
    img: {
      width: 120,
      height: 120
    },
    titleblock: {
      fontFamily: theme.fontFamily,
      display: 'inline-block',
      verticalAlign: 'top',
      padding: '30px 40px'
    },
    title: {
      fontSize: theme.fontS,
      fontWeight: 'bold',
      color: theme.brandColor,
      margin: 0
    },
    subtitle: {
      fontSize: theme.fontS,
      color: theme.textMedium,
      margin: 0
    }
  };
}

class DownloadSpecimen extends React.Component {
  render() {
    let styles = getStyle(this.props.theme);

    return (
      <div style={styles.container} >
        <a style={styles.a} href={this.props.url} download={this.props.filename || this.props.title} >
          <img src={downloadIconSrc} style={styles.img}  />
          <div style={styles.titleblock}>
            <h2 style={styles.title}>{this.props.title}</h2>
            <h3 style={styles.subtitle}>{this.props.subtitle}</h3>
          </div>
        </a>
      </div>
    );
  }
}

DownloadSpecimen.defaultProps = {
  title: '',
  subtitle: '',
  url: '',
  theme: {}
};

DownloadSpecimen.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  url: PropTypes.string,
  filename: PropTypes.string,
  theme: PropTypes.object.isRequired
};

export default Radium(DownloadSpecimen);
