import React, {Component, PropTypes} from 'react';

export default class Foo extends Component {
  render() {
    return (
      <div style={{fontFamily: 'Helvetica'}} {...this.props}>
        <strong>{this.props.name}</strong>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

Foo.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node
};
