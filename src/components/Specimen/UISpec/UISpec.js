import React, { PropTypes } from 'react';
import Radium from 'radium';

import MetadataBlock from '../shared/MetadataBlock';


function parseImage(image) {
  switch (typeof image) {
  case 'string' : {
    return image;
  }
  case 'undefined' : {
    return null;
  }
  default: {
    throw new Error('Image objects are not supported yet');
  }
  }
}

class UISpec extends React.Component {
  render() {
    const {theme, entries} = this.props;

    let styles = {
      section: {
        alignContent: 'flex-start',
        alignItems: 'stretch',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start'
      },
      container: {
        flex: '1 0 auto',
        margin: '0 10px 10px 0',
        minWidth: '300px',
        padding: '14px',
        position: 'relative',
        background: theme.background
      },
      image: {
        marginBottom: '14px'
      },
      overlay: {
        opacity: 0,
        position: 'absolute',
        top: '14px',
        left: '14px',
        ':hover': {
          opacity: 1
        }
      },
      light: {
        background: `url(${theme.checkerboardPatternLight})`
      },
      dark: {
        background: `url(${theme.checkerboardPatternDark})`
      },
      plain: {
        background: 'transparent',
        padding: `${theme.sizeL / 2}px 0`
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

    let entryObjects = entries.map( (entry, key) => {
      let background = []
        .concat(entry.background !== null
          ? entry.background
          : [])
        .join('_');

      let isDark = entry.background ? background.indexOf('dark') > -1 : false;

      let overlay = entry.overlay !== undefined
        ? <img style={styles.overlay} src={parseImage( entry.overlay )}/>
        : null;

      let minWidth = entry.span !== undefined
        ? {flex: entry.span, minWidth: `${entry.span * 300}px`}
        : null;

      let links = []
        .concat(entry.links
          ? entry.links
          : [])
        .concat(entry.link
          ? entry.link
          : []);

      return (
        <div key={key} style={[styles.container, minWidth, styles[background]]}>
          <img style={styles.image} src={parseImage( entry.image )}/>
          {overlay}
          <MetadataBlock
            title={entry.title}
            theme={theme}
            inverted={isDark}
            links={links}
            attributes={entry.attributes}
            />
        </div>
      );
    });

    return (
      <section style={styles.section}>
        {entryObjects}
      </section>
    );
  }
}

UISpec.propTypes = {
  theme: PropTypes.object.isRequired,
  entries: PropTypes.array.isRequired
};

export default Radium(UISpec);
