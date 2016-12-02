import React, {PropTypes} from 'react';
import {catalogShape} from '../CatalogPropTypes';
import Radium, {Style} from 'radium';
import Specimen from '../components/Specimen/Specimen';
import renderMarkdown from '../utils/renderMarkdown';

import {text, heading} from '../styles/typography';

class Image extends React.Component {
  render() {
    const {catalog: {theme}, src, title, overlay, description, ...options} = this.props;

    const styles = {
      container: {
        position: 'relative',
        width: '100%'
      },
      imageContainer: {
        boxSizing: 'border-box',
        padding: '20px',
        background: `url(${theme.checkerboardPatternLight})`,
        color: theme.textColor
      },
      image: {
        display: 'block',
        maxWidth: '100%'
      },
      overlay: {
        boxSizing: 'border-box',
        opacity: 0,
        width: '100%',
        position: 'absolute',
        padding: 20,
        top: 0,
        left: 0,
        ':hover': {
          opacity: 1
        }
      },
      meta: {
        margin: `20px 0 0 0`
      },
      title: {
        ...heading(theme, 0),
        fontWeight: 700,
        margin: `0 0 8px 0`
      },
      description: {
        ...text(theme, -1)
      },
      light: {
        background: `url(${theme.checkerboardPatternLight})`
      },
      dark: {
        background: `url(${theme.checkerboardPatternDark})`
      },
      plain: {
        background: 'transparent',
        padding: 0
      },
      plain_light: {
        background: theme.bgLight,
        padding: '20px'
      },
      plain_dark: {
        background: theme.bgDark,
        padding: '20px'
      }
    };

    const backgroundStyle = {
      ...(options.plain ? styles.plain : null),
      ...(options.light ? styles.light : null),
      ...(options.dark ? styles.dark : null),
      ...(options.plain && options.light ? styles.plain_light : null),
      ...(options.plain && options.dark ? styles.plain_dark : null)
    };

    // Deconstruct srcset strings
    const fallbackSrc = src.split(' ')[0];
    const fallbackOverlay = overlay ? overlay.split(' ')[0] : undefined;

    return (
      <div style={styles.container}>
        <div style={{...styles.imageContainer, ...backgroundStyle}}>
          <Style
            scopeSelector='.cg-ImageSpecimenDescription >'
            rules={{
              ':first-child': {
                marginTop: 0
              },
              ':last-child': {
                marginBottom: 0
              }
            }}/>
          <img style={styles.image} srcSet={src} src={fallbackSrc}/>
          {overlay && <div style={{...styles.overlay, ...(options.plain && !options.light && !options.dark ? {padding: 0} : null)}}>
            <img style={styles.image} srcSet={overlay} src={fallbackOverlay} />
          </div>}
        </div>
        {(title || description) && <div style={styles.meta}>
          {title && <div style={styles.title}>{title}</div>}
          {description && <div className='cg-ImageSpecimenDescription' style={styles.description}>{renderMarkdown({text: description})}</div>}
        </div>}
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
