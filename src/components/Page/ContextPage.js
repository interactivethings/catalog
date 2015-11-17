import React, {PropTypes} from 'react';
import CatalogPropTypes from '../../CatalogPropTypes';
import runscript from '../../utils/runscript';

import Loader from './Loader';
import PageRenderer from './PageRenderer';

class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      content: null
    };
  }

  componentDidMount() {
    this.context.page.scripts.forEach(runscript);
    this.fetchPageData(this.context.page.src);
  }

  componentWillReceiveProps(_, nextContext) {
    if (nextContext.page.src !== this.context.page.src) {
      this.setState({content: null});
      this.fetchPageData(nextContext.page.src);
    }
  }

  render() {
    const content = this.state.content || <Loader />;
    return <PageRenderer content={content} />;
  }

  fetchPageData(url) {
    fetch(url)
      .then((response) => response.text())
      .then((text) => this.setState({content: text}))
      .catch((error) => {
        return this.setState({
          content: error
        });
      });
  }
}

Page.contextTypes = {
  page: CatalogPropTypes.page.isRequired
};

export default Page;
