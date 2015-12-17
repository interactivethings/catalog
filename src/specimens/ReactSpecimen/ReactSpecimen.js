import React, { PropTypes, Component } from 'react';
import Radium from 'radium';
import Frame from '../../components/Frame/Frame';
import Specimen from '../../components/Specimen/Specimen';
import HighlightedCode from '../../components/HighlightedCode/HighlightedCode';
import reactElementToString from './reactElementToString';

function getStyle(theme) {
  return {
    container: {
      position: 'relative',
      width: '100%',
      border: '1px solid #eee',
      margin: '0 0 20px 0'
    },
    content: {
      background: `url(${theme.checkerboardPatternLight})`,
      borderRadius: '2px',
      border: 'none',
      boxSizing: 'border-box',
      display: 'block',
      padding: 20,
      position: 'relative',
      width: '100%'
    },
    light: {
      background: `url(${theme.checkerboardPatternLight})`
    },
    dark: {
      background: `url(${theme.checkerboardPatternDark})`
    },
    plain: {
      background: 'transparent',
      padding: '0'
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
}

class ReactSpecimen extends Component {
  render() {
    const {theme, children, noSource, frame, ...options} = this.props;
    const styles = getStyle(theme);

    const exampleStyles = {
      ...(options.plain ? styles.plain : null),
      ...(options.light ? styles.light : null),
      ...(options.dark ? styles.dark : null),
      ...(options.plain && options.light ? styles.plain_light : null),
      ...(options.plain && options.dark ? styles.plain_dark : null)
    };

    return (
      <section style={styles.container}>
        <div style={{...styles.content, ...exampleStyles}}>
          {frame ? <Frame>{children}</Frame> : children }
        </div>
        {!noSource && <HighlightedCode language='jsx' code={reactElementToString(children)} theme={theme} />}
      </section>
    );
  }
}

ReactSpecimen.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  noSource: PropTypes.bool,
  plain: PropTypes.bool,
  light: PropTypes.bool,
  dark: PropTypes.bool,
  frame: PropTypes.bool
};

export default Specimen()(Radium(ReactSpecimen));
