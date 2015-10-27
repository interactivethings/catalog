import reqwest from 'reqwest';
import React, { PropTypes } from 'react';

import Loader from './Loader';
import PageRenderer from './PageRenderer';

class Page extends React.Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
    scripts: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    styles: [],
    scripts: []
  }

  state = {
    error: null,
    content: null
  }

  componentDidMount() {
    this.props.scripts.forEach(Catalog.actions.runscript);
    this.fetchPageData();
  }

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error}</div>;
    } else if (this.state.content) {
      return <PageRenderer {...this.props} content={this.state.content} />;
    }
    return <Loader />;
  }

  fetchPageData() {
    reqwest({url: this.props.page.src, type: 'text'})
      .then((res) => this.setState({content: res.responseText}))
      .fail((res) => {
        return this.setState({
          error: res.statusText,
          content: null
        });
      });
  }
}

export default Page;
