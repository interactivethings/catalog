import React, {Component, PropTypes} from 'react';

export default class Span extends Component {
  render() {
    const {children, span} = this.props;

    const style = {
      boxSizing: 'border-box',
      display: 'flex',
      flexBasis: span && window.innerWidth > 640 ?
        `calc(${span / 6 * 100}% - 10px)` :
        'calc(100% - 10px)',
      // Bug fix for Firefox; width and flexBasis don't work on horizontally scrolling code blocks
      maxWidth: span && window.innerWidth > 640 ?
        `calc(${span / 6 * 100}% - 10px)` :
        'calc(100% - 10px)',
      flexWrap: 'wrap',
      margin: '24px 10px 0 0',
      padding: 0,
      position: 'relative'
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
