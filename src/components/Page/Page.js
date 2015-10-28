import reqwest from 'reqwest';
import React, { PropTypes } from 'react';
import {page} from 'core/PropTypes';

import Loader from './Loader';
import PageRenderer from './PageRenderer';

class Page extends React.Component {
  static propTypes = {
    page: page.isRequired
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
    this.props.page.scripts.forEach(Catalog.actions.runscript);
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
