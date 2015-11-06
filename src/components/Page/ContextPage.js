import React, {PropTypes} from 'react';
import {actions} from 'core/Catalog';
import CatalogPropTypes from 'CatalogPropTypes';

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
    this.context.page.scripts.forEach(actions.runscript);
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
    return <PageRenderer {...this.props} {...this.context} content={content} />;
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
  page: CatalogPropTypes.page.isRequired,
  theme: PropTypes.object.isRequired
};

Page.defaultProps = {
  styles: [],
  scripts: []
};

export default Page;
