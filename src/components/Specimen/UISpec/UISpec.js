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
        display: 'flex',
        flexFlow: 'row wrap',
        paddingBottom: 10,
        width: 'calc(100% + 10px)'
      },
      container: {
        boxSizing: 'border-box',
        margin: '0 10px 10px 0',
        padding: '14px',
        position: 'relative',
        background: theme.background
      },
      image: {
        marginBottom: '14px',
        maxWidth: '100%'
      },
      overlay: {
        opacity: 0,
        maxWidth: 'calc(100% - 28px)',
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

    let entryObjects = entries.map( (entry, key) => {
      let background = []
        .concat(entry.background !== null
          ? entry.background
          : [])
        .join('_');

      let isDark = entry.background ? background.indexOf('dark') > -1 : false;

      let overlay = entry.overlay !== undefined
        ? <img key={key} style={styles.overlay} src={parseImage( entry.overlay )}/>
        : null;

      let basicGrid = [1 / 6, 1 / 3, 1 / 2, 2 / 3, 5 / 6, 1];

      let minWidth = entry.span !== undefined
        ? {flexBasis: `calc(${basicGrid[entry.span - 1] * 100}% - 10px)`}
        : {flexBasis: `calc(${basicGrid[1] * 100}% - 10px)`};

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
