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
      this.setState({content: null});
      this.fetchPageData(nextContext.catalog.page.src);
    }
  }

  componentDidMount() {
    const {params, location: {query: {j}}} = this.props;
    if (j) {
      setTimeout(() => {
        const el = document.getElementById(j);
        if (el) {
          console.log(el)
          el.scrollIntoView();
        }
      }, 1000);
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
  catalog: catalogShape.isRequired
};

export default PageContentLoader;
