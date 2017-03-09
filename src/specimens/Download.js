import React, {PropTypes} from 'react';
import {catalogShape} from '../CatalogPropTypes';
import {getFontSize} from '../styles/typography';
import Radium from 'radium';
import Specimen from '../components/Specimen/Specimen';

const DownloadIcon = Radium(({style, fill}) => (
  <svg style={style} viewBox='0 0 120 120'>
    <g fill='none' fillRule='evenodd'>
      <rect width='120' height='120' fill='#EEEEEE' rx='2'/>
      <g fill={fill}>
        <path d='M72.647 53.353c-.468-.47-1.226-.47-1.697 0L61 63.303V36.2c0-.662-.538-1.2-1.2-1.2-.662 0-1.2.538-1.2 1.2v27.103l-9.95-9.95c-.47-.47-1.23-.47-1.7 0-.468.468-.468 1.226 0 1.697l12 12c.236.232.543.35.85.35.307 0 .614-.118.85-.353l12-12c.468-.468.468-1.226-.003-1.694z'/>
        <path d='M79 75.8H40.6c-1.985 0-3.6-1.615-3.6-3.6v-4.8c0-.662.538-1.2 1.2-1.2.662 0 1.2.538 1.2 1.2v4.8c0 .662.538 1.2 1.2 1.2H79c.662 0 1.2-.538 1.2-1.2v-4.8c0-.662.538-1.2 1.2-1.2.662 0 1.2.538 1.2 1.2v4.8c0 1.985-1.615 3.6-3.6 3.6z'/>
      </g>
    </g>
  </svg>
));

function getStyle(theme) {
  return {
    container: {
      width: '100%',
      height: 80,
      background: '#fff',
      border: '1px solid #eee',
      transition: '.4s background',
      // Keep, so Radium attaches hover state
      ':hover': {}
    },
    a: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      textDecoration: 'none'
    },
    img: {
      width: 80,
      height: 80,
      display: 'none',
      flexShrink: 0,
      '@media (min-width: 630px)': {
        display: 'block'
      }
    },
    titleblock: {
      fontFamily: theme.fontFamily,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexGrow: 1,
      lineHeight: 1.33333,
      padding: '12px 0 12px 16px',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    },
    title: {
      color: theme.brandColor,
      fontSize: getFontSize(theme, -1),
      fontWeight: 700,
      margin: 0
    },
    subtitle: {
      fontSize: getFontSize(theme, -1),
      color: '#999',
      margin: 0
    }
  };
}

class DownloadSpecimen extends React.Component {
  render() {
    const {catalog: {theme}, title, subtitle, url, filename} = this.props;
    const styles = getStyle(theme);
    const isHovered = Radium.getState(this.state, null, ':hover');
    const textColor = isHovered ? {color: theme.linkColor} : {};
    const arrowFill = isHovered ? theme.linkColor : theme.brandColor;

    const image = this.props.span !== 1 ? <DownloadIcon style={styles.img} fill={arrowFill} /> : null;

    return (
      <div style={styles.container} >
        <a style={styles.a} href={url} download={filename} >
          {image}
          <div style={styles.titleblock}>
            <h2 style={{...styles.title, ...textColor}}>{title}</h2>
            <h3 style={{...styles.subtitle, ...textColor}}>{subtitle}</h3>
          </div>
        </a>
      </div>
    );
  }
}

DownloadSpecimen.defaultProps = {
  title: '',
  subtitle: '',
  theme: {}
};

DownloadSpecimen.propTypes = {
  catalog: catalogShape.isRequired,
  span: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  url: PropTypes.string.isRequired,
  filename: PropTypes.string
};

export default Specimen()(Radium(DownloadSpecimen));
