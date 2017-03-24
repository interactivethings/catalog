import React, {Component} from 'react';
import {catalogShape} from '../../CatalogPropTypes';

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
    this.fetchPageData(this.context.catalog.page.src);
  }

  componentWillReceiveProps(_, nextContext) {
    if (nextContext.catalog.page.src !== this.context.catalog.page.src) {
      this.fetchPageData(nextContext.catalog.page.src);
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
    return <PageRenderer {...this.props} content={content} />;
  }
}

PageContentLoader.contextTypes = {
  catalog: catalogShape.isRequired
};

export default PageContentLoader;
