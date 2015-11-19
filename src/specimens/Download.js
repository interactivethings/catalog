import React, { PropTypes } from 'react';
import Radium from 'radium';
import Specimen from '../components/Specimen/Specimen';

const DownloadIcon = (props) => (
  <svg {...props} viewBox='0 0 120 120'>
    <g fill='none' fill-rule='evenodd'>
      <rect width='120' height='120' fill='#EBEBEB' rx='2'/>
      <g fill='#FFF'>
        <path d='M72.647 53.353c-.468-.47-1.226-.47-1.697 0L61 63.303V36.2c0-.662-.538-1.2-1.2-1.2-.662 0-1.2.538-1.2 1.2v27.103l-9.95-9.95c-.47-.47-1.23-.47-1.7 0-.468.468-.468 1.226 0 1.697l12 12c.236.232.543.35.85.35.307 0 .614-.118.85-.353l12-12c.468-.468.468-1.226-.003-1.694z'/>
        <path d='M79 75.8H40.6c-1.985 0-3.6-1.615-3.6-3.6v-4.8c0-.662.538-1.2 1.2-1.2.662 0 1.2.538 1.2 1.2v4.8c0 .662.538 1.2 1.2 1.2H79c.662 0 1.2-.538 1.2-1.2v-4.8c0-.662.538-1.2 1.2-1.2.662 0 1.2.538 1.2 1.2v4.8c0 1.985-1.615 3.6-3.6 3.6z'/>
      </g>
    </g>
  </svg>
);

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
      fontWeight: 600,
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

    let image = this.props.span !== 1 || window.innerWidth < 630 ? <DownloadIcon style={styles.img} /> : null;

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
