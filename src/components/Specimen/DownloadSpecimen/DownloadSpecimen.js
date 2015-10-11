import React, { PropTypes } from 'react';

function getStyle(theme) {

}

class DownloadSpecimen extends React.Component {
  static PropTypes = {

  }

  static defaultProps = {

  }

  render() {
    console.log(this.props.title, this.props.subtitle, this.props.url);
    return <div />;
  }
}

export default DownloadSpecimen;
