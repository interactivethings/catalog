import reqwest from 'reqwest';

import React, {PropTypes} from 'react';
import {actions} from 'core/Catalog';
import CatalogPropTypes from 'core/PropTypes';

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
    reqwest({url, type: 'text'})
      .then((res) => this.setState({content: res.responseText}))
      .fail((res) => {
        return this.setState({
          content: res.statusText
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
