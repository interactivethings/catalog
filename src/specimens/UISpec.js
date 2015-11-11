import React, { PropTypes } from 'react';
import Radium from 'radium';

import {text, link, heading} from 'scaffold/typography';


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

function generateLinkList(links, styles) {
  let items = links.map( (url, key) => {
    return <li key={key} style={styles.truncate}><a style={styles.link} href={url}>{url}</a></li>;
  });
  return items;
}

function generateList(attributes) {
  let items = attributes.map( (content, key) => {
    return <li key={key}>{content}</li>;
  });
  return items;
}

class UISpec extends React.Component {
  render() {
    const {theme, entries} = this.props;

    let styles = {
      section: {
        display: 'flex',
        flexFlow: 'row wrap',
        minWidth: 'calc(100% + 10px)'
      },
      container: {
        boxSizing: 'border-box',
        margin: '0 10px 10px 0',
        padding: '14px',
        position: 'relative',
        background: theme.background,
        color: theme.textColor
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
      title: {
        ...heading(theme, {level: 6}),
        margin: 0
      },
      link: {
        ...link(theme),
        maxWidth: '100%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      },
      truncate: {
        maxWidth: '100%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      },
      list: {
        ...text(theme, {level: 3}),
        listStyleType: 'none',
        paddingLeft: 0,
        marginLeft: 0,
        marginTop: 5
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

      let title = entry.title !== undefined
        ? <div style={styles.title}>{entry.title}</div>
        : null;

      let image = entry.image !== undefined || entry.image_srcset !== undefined
        ? <img key={'image' + key} style={styles.image} srcSet={entry.image_srcset ? entry.image_srcset : '' }  src={parseImage(entry.image)}/>
        : null;

      let overlay = entry.overlay !== undefined
        ? <img key={'overlay' + key} style={styles.overlay} srcSet={entry.overlay_srcset ? entry.overlay_srcset : '' } src={parseImage( entry.overlay )}/>
        : null;

      let video = entry.video !== undefined
        ? <video src={entry.video} controls width='100%'>Open <a href={entry.video} target='_blank'>video</a> in a new Tab</video>
        : null;

      let minWidth = entry.span !== undefined
        ? {flexBasis: `calc(${ entry.span / 6 * 100}% - 10px)`}
        : {flexBasis: `calc(${ 1 / 3 * 100}% - 10px)`};

      let links = []
        .concat(entry.links
          ? entry.links
          : [])
        .concat(entry.link
          ? entry.link
          : []);

      let attributeList = entry.attributes !== undefined
        ? <ul style={{...styles.list, color: isDark ? 'white' : 'inherit'}}>{generateList(entry.attributes)}</ul>
        : null;

      let linkList = links.length > 0
        ? <ul style={{...styles.list}}>{generateLinkList(links, styles)}</ul>
        : null;

      return (
        <div key={key} style={[styles.container, minWidth, styles[background]]}>
          {image}
          {overlay}
          {video}
          {title}
          {attributeList}
          {linkList}
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
