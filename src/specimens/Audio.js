import React, { PropTypes } from 'react';
import Radium from 'radium';
import Specimen from '../components/Specimen/Specimen';
import Span from '../components/Specimen/Span';

import {heading} from '../scaffold/typography';

class Audio extends React.Component {
  render() {
    const {src, title, loop, autoplay, span, theme} = this.props;

    let styles = {
      section: {
        display: 'flex',
        flexFlow: 'row wrap',
        minWidth: 'calc(100% + 10px)'
      },
      title: {
        ...heading(theme, {level: 6}),
        margin: 0
      },
      container: {
        width: '100%',
        background: theme.background
      }
    };

    const audioTitle = title !== undefined ?
      title :
      src.split('/').slice(-1)[0];

    return (
        <div style={styles.container}>
          <div style={styles.title}>{audioTitle}</div>
          <audio style={{ width: '100%'}} src={src} autoPlay={autoplay} loop={loop} controls />
        </div>
    );
  }
}

Audio.propTypes = {
  theme: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool
};

Audio.defaultProps = {
  loop: false,
  autoplay: false
};

export default Specimen()(Radium(Audio));
