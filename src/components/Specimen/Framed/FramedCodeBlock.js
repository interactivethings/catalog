import React, { PropTypes } from 'react';
import Frame from 'react-frame-component';

function getStyle(theme) {
  return {
    container: {
      border: 'none',
      height: '100%',
      width: '100%',
    },
  }
}

class FramedCodeBlock extends React.Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
  }
  render() {
    const {theme, code, modifiers} = this.props;
    let styles = getStyle(theme);
    return (
      <section className={'cg-CodeBlock ' + (modifiers ? 'cg-CodeBlock--' + modifiers : '')}>
        <Frame style={styles.container}>
          <div dangerouslySetInnerHTML={{__html: code}} />
        </Frame>
      </section>
    );
  }
}

export default FramedCodeBlock;
