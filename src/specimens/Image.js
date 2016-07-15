import React, {PropTypes} from 'react';
import {catalogShape} from '../CatalogPropTypes';
import Radium from 'radium';
import Specimen from '../components/Specimen/Specimen';
import renderMarkdown from '../utils/renderMarkdown';

import {text, heading} from '../styles/typography';

class Image extends React.Component {
  render() {
    const {catalog: {theme}, src, title, overlay, description, ...options} = this.props;

    const styles = {
      container: {
        boxSizing: 'border-box',
        padding: '20px',
        position: 'relative',
        background: `url(${theme.checkerboardPatternLight})`,
        color: theme.textColor,
        width: '100%'
      },
      image: {
        maxWidth: '100%'
      },
      overlay: {
        opacity: 0,
        maxWidth: '100%',
        position: 'absolute',
        top: '20px',
        left: '20px',
        ':hover': {
          opacity: 1
        }
      },
      title: {
        ...heading(theme, {level: 6}),
        margin: 0
      },
      truncate: {
        maxWidth: '100%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      },
      description: {
        ...text(theme, {level: 2}),
        marginTop: 5
      },
      light: {
        background: `url(${theme.checkerboardPatternLight})`
      },
      dark: {
        background: `url(${theme.checkerboardPatternDark})`,
        color: '#fff'
      },
      plain: {
        background: 'transparent',
        padding: 0
      },
      plain_light: {
        background: theme.bgLight,
        padding: `${theme.sizeL / 2}px`
      },
      plain_dark: {
        background: theme.bgDark,
        padding: `${theme.sizeL / 2}px`
      }
    };

    const backgroundStyle = {
      ...(options.plain ? styles.plain : null),
      ...(options.light ? styles.light : null),
      ...(options.dark ? styles.dark : null),
      ...(options.plain && options.light ? styles.plain_light : null),
      ...(options.plain && options.dark ? styles.plain_dark : null)
    };

    return (
        <div style={{...styles.container, ...backgroundStyle}}>
          <img style={styles.image} srcSet={src}/>
          {overlay && <img style={{...styles.overlay, ...(options.plain ? {top: 0, left: 0, maxWidth: '100%'} : null)}} srcSet={overlay} />}
          {title && <div style={styles.title}>{title}</div>}
          {description && <div style={{...styles.description, ...(options.dark ? {color: '#fff'} : null)}}>{renderMarkdown({text: description})}</div>}
        </div>
    );
  }
}

Image.propTypes = {
  catalog: catalogShape.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  overlay: PropTypes.string,
  description: PropTypes.string,
  plain: PropTypes.bool,
  light: PropTypes.bool,
  dark: PropTypes.bool
};

export default Specimen()(Radium(Image));
