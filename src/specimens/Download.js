import React, { PropTypes } from 'react';
import Radium from 'radium';
import Specimen from 'components/Specimen/Specimen';

import downloadIconSrc from 'assets/download-icon.svg';

function getStyle(theme) {
  return {
    container: {
      display: 'block',
      width: '100%',
      height: 80,
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
      width: 80,
      height: 80
    },
    titleblock: {
      fontFamily: theme.fontFamily,
      display: 'inline-block',
      verticalAlign: 'top',
      padding: '20px 0 0 20px'
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
    const {theme, body: {title, subtitle, url, filename}} = this.props;
    const styles = getStyle(theme);

    let image = this.props.span !== 1 || window.innerWidth < 630 ? <img src={downloadIconSrc} style={styles.img}  /> : null;

    return (
      <div style={styles.container} >
        <a style={styles.a} href={url} download={filename || title} >
          {image}
          <div style={styles.titleblock}>
            <h2 style={styles.title}>{title}</h2>
            <h3 style={styles.subtitle}>{subtitle}</h3>
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
  theme: PropTypes.object.isRequired,
  span: PropTypes.number,
  body: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    url: PropTypes.string,
    filename: PropTypes.string
  }).isRequired
};

export default Specimen(Radium(DownloadSpecimen));
