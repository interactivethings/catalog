import React, {Component, PropTypes} from 'react';

export default class Span extends Component {
  render() {
    const {children, span} = this.props;

    const style = {
      margin: '0 10px 10px 0',
      flexBasis: span && window.innerWidth > 640 ?
        `calc(${span / 6 * 100}% - 10px)` :
        'calc(100% - 10px)'
    };

    return (
      <section style={style}>
        {children}
      </section>
    );
  }
}

Span.propTypes = {
  span: PropTypes.number,
  children: PropTypes.node.isRequired
};
