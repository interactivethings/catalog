import React, { PropTypes } from 'react';
import Radium from 'radium';

import {heading} from 'scaffold/typography';

class Audio extends React.Component {
  render() {
    const {body, theme} = this.props;

    let styles = {
      section: {
        display: 'flex',
        flexFlow: 'row wrap',
        minWidth: 'calc(100% + 10px)'
      },
      container: {
        boxSizing: 'border-box',
        margin: '0 10px 10px 0',
        padding: 0,
        position: 'relative'
      },
      title: {
        ...heading(theme, {level: 6}),
        margin: 0
      }
    };

    let entryObjects = body.map( (entry, key) => {
      let autoplay = entry.autoplay !== undefined && entry.autoplay !== 'false'
        ? entry.autoplay
        : null;

      let loop = entry.loop !== undefined && entry.loop !== 'false'
        ? entry.loop
        : null;

      let title = entry.title !== undefined
        ? <div style={styles.title}>{entry.title}</div>
        : null;

      let audio = entry.src !== undefined
        ? <audio style={{ width: '100%'}} src={entry.src} autoPlay={autoplay} loop={loop} controls width='100%'></audio>
        : null;

      let minWidth = entry.span !== undefined
        ? {flexBasis: `calc(${ entry.span / 6 * 100}% - 10px)`}
        : {flexBasis: 'calc(100% - 10px)'};

      return (
        <div key={key} style={[styles.container, minWidth]}>
          {audio}
          {title}
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

Audio.propTypes = {
  theme: PropTypes.object.isRequired,
  body: PropTypes.array.isRequired
};

export default Radium(Audio);
