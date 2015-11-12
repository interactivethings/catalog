import React, { PropTypes } from 'react';
import Radium from 'radium';
import Specimen from 'components/Specimen/Specimen';
import Span from 'components/Specimen/Span';

import {heading} from 'scaffold/typography';

class Video extends React.Component {
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

      let muted = entry.muted !== undefined && entry.muted !== 'false'
        ? entry.muted
        : null;

      let title = entry.title !== undefined
        ? <div style={styles.title}>{entry.title}</div>
        : null;

      let video = entry.src !== undefined
        ? <video src={entry.src} autoPlay={autoplay} loop={loop} muted={muted} controls style={{width: '100%', height: '100%'}}>Open <a href={entry.src} target='_blank'>video</a> in a new Tab</video>
        : null;

      return (
        <Span key={key} span={entry.span}>
          {video}
          {title}
        </Span>
      );
    });

    return (
      <section style={styles.section}>
        {entryObjects}
      </section>
    );
  }
}

Video.propTypes = {
  theme: PropTypes.object.isRequired,
  body: PropTypes.array.isRequired
};

export default Specimen(Radium(Video));
