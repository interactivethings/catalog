import React, {Component, PropTypes} from 'react';

export default class Page extends Component {
  render() {
    const {children} = this.props;
    const {theme} = this.context;

    const margin = window.innerWidth > 640 ? theme.sizeL * 2 : theme.sizeL;

    const style = {
      display: 'flex',
      flexFlow: 'row wrap',
      margin: `28px ${margin - 10}px 14px ${margin}px`,
    }

    return (
      <div style={style}>
        {children}
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node
};

Page.contextTypes = {
  theme: PropTypes.object.isRequired
}
