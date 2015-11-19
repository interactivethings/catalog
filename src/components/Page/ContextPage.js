import React, {Component} from 'react';
import CatalogPropTypes from '../../CatalogPropTypes';
import runscript from '../../utils/runscript';

import Loader from './Loader';
import PageRenderer from './PageRenderer';

const docSrc = (src) => '.' + src.replace(/^docs/, '');
const getDocContext = () => require.context('raw!../../../docs', true, /\.md$/);

class Page extends Component {
  constructor() {
    super();
    this.state = {
      content: null
    };
  }

  componentWillMount() {
    if (module.hot) {
      let ctx = getDocContext();
      this.setState({content: ctx(docSrc(this.context.page.src))});

      module.hot.accept(ctx.id, () => {
        ctx = getDocContext();
        this.setState({content: ctx(docSrc(this.context.page.src))});
      });
      return;
    }

    this.fetchPageData(this.context.page.src);
  }

  componentDidMount() {
    this.context.page.scripts.forEach(runscript);
  }

  componentWillReceiveProps(_, nextContext) {
    if (nextContext.page.src !== this.context.page.src) {
      if (module.hot) {
        const ctx = getDocContext();
        this.setState({content: ctx(docSrc(nextContext.page.src))});
        return;
      }
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
