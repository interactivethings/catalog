import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

class Span extends Component {
  render() {
    const {children, span} = this.props;

    const style = {
      boxSizing: 'border-box',
      display: 'flex',
      flexBasis: '100%',
      // Bug fix for Firefox; width and flexBasis don't work on horizontally scrolling code blocks
      maxWidth: '100%',
      flexWrap: 'wrap',
      margin: '24px 0 0 0',
      padding: 0,
      position: 'relative',
      '@media (min-width: 640px)': {
        flexBasis: `calc(${span / 6 * 100}% - 10px)`,
        // Bug fix for Firefox; width and flexBasis don't work on horizontally scrolling code blocks
        maxWidth: `calc(${span / 6 * 100}% - 10px)`,
        margin: '24px 10px 0 0'
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

Span.defaultProps = {
  span: 6
};

export default Radium(Span);
