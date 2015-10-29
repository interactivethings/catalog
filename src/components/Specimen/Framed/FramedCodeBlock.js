import React, { PropTypes } from 'react';
import Frame from 'react-frame-component';

function getStyle() {
  return {
    container: {
      border: 'none',
      height: '100%',
      width: '100%'
    }
  };
}

class FramedCodeBlock extends React.Component {
  render() {
    const {code, modifiers} = this.props;
    let styles = getStyle();
    return (
      <section className={'cg-CodeBlock ' + (modifiers ? 'cg-CodeBlock--' + modifiers : '')}>
        <Frame style={styles.container} head={<style>{'body,html{margin:0;padding:0}'}</style>}>
          <div dangerouslySetInnerHTML={{__html: code}} />
        </Frame>
      </section>
    );
  }
}

FramedCodeBlock.propTypes = {
  theme: PropTypes.object.isRequired,
  code: PropTypes.string.isRequired,
  modifiers: PropTypes.array
};

export default FramedCodeBlock;
