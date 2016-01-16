import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

class Span extends Component {
  render() {
    const {children, span} = this.props;

    const style = {
      boxSizing: 'border-box',
      display: 'flex',
      flexBasis: 'calc(100% - 10px)',
      // Bug fix for Firefox; width and flexBasis don't work on horizontally scrolling code blocks
      maxWidth: 'calc(100% - 10px)',
      flexWrap: 'wrap',
      margin: '24px 10px 0 0',
      padding: 0,
      position: 'relative',
      '@media (min-width: 640px)': {
        flexBasis: `calc(${span / 6 * 100}% - 10px)`,
        // Bug fix for Firefox; width and flexBasis don't work on horizontally scrolling code blocks
        maxWidth: `calc(${span / 6 * 100}% - 10px)`
      }
    };

    return (
      <div {...this.props} style={{...style, ...this.props.style}}>
        {children}
      </div>
    );
  }
}

Span.propTypes = {
  span: PropTypes.number,
  children: PropTypes.node.isRequired,
  style: PropTypes.object
};

Span.defaulProps = {
  span: 6
};

export default Radium(Span);
