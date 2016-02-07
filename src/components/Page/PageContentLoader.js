import React, {Component} from 'react';
import CatalogPropTypes from '../../CatalogPropTypes';

import Loader from './Loader';
import PageRenderer from './PageRenderer';

class PageContentLoader extends Component {
  constructor() {
    super();
    this.state = {
      content: null
    };
  }

  componentWillMount() {
    this.fetchPageData(this.context.page.src);
  }

  componentWillReceiveProps(_, nextContext) {
    if (nextContext.page.src !== this.context.page.src) {
      this.setState({content: null});
      this.fetchPageData(nextContext.page.src);
    }
  }

  fetchPageData(url) {
    fetch(url, {credentials: 'same-origin'})
      .then((response) => response.text())
      .then((text) => this.setState({content: text}))
      .catch((error) => {
        return this.setState({
          content: error
        });
      });
  }

  render() {
    const content = this.state.content || <Loader />;
    return <PageRenderer content={content} />;
  }
}

PageContentLoader.contextTypes = {
  page: CatalogPropTypes.page.isRequired
};

export default PageContentLoader;
