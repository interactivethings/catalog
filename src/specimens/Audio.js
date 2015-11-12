import React, { PropTypes } from 'react';
import Radium from 'radium';
import Specimen from 'components/Specimen/Specimen';
import Span from 'components/Specimen/Span';

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
      title: {
        ...heading(theme, {level: 6}),
        margin: 0
      }
    };

    let entryObjects = body.map( (entry, key) => {
      let autoplay = entry.autoplay !== undefined && entry.autoplay !== 'false'
        ? true
        : false;

      let loop = entry.loop !== undefined && entry.loop !== 'false'
        ? true
        : false;

      let title = entry.title !== undefined
        ? <div style={styles.title}>{entry.title}</div>
        : null;

      let audio = entry.src !== undefined
        ? <audio style={{ width: '100%'}} src={entry.src} autoPlay={autoplay} loop={loop} controls></audio>
        : null;

      return (
        <Span key={key} span={entry.span}>
          {audio}
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

Audio.propTypes = {
  theme: PropTypes.object.isRequired,
  body: PropTypes.array.isRequired
};

export default Specimen(Radium(Audio));
