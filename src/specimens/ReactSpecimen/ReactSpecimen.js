import React, { PropTypes, Component } from 'react';
import Radium from 'radium';
import Specimen from '../../components/Specimen/Specimen';
import HighlightedCode from '../../components/HighlightedCode/HighlightedCode';
import reactElementToString from './reactElementToString';

function getStyle(theme) {
  return {
    container: {
      position: 'relative',
      flexBasis: '100%',
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
    }
  };
}

class ReactSpecimen extends Component {
  render() {
    const {theme, children} = this.props;
    const styles = getStyle(theme);

    return (
      <section style={styles.container}>
        <div style={styles.content}>
          {children}
        </div>
        <HighlightedCode language='jsx' code={reactElementToString(children)} theme={theme} />
      </section>
    );
  }
}

ReactSpecimen.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

export default Specimen()(Radium(ReactSpecimen));
