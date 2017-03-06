import React, {PropTypes, Component} from 'react';

import Loader from './Loader';
import Page from './Page';
import PageRenderer from './PageRenderer';

// This component loads the page content which is given as a promise which
// resloves to a React Element.
//
// The promise SHOULD NOT reject. If it can not load the content (eg. the URL
// given to 'fetchMarkdown' points to non-existent content), the promise
// is responsible for generating a proper error page.
class PageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null
    };
  }

  componentWillMount() {
    this.fetchContent(this.props.contentPromiseFn);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contentPromiseFn !== this.props.contentPromiseFn) {
      this.setState({content: null});
      this.fetchContent(nextProps.contentPromiseFn);
    }
  }

  fetchContent(contentPromiseFn) {
    contentPromiseFn()
      .then((content) => { this.setState({content}); })
      .catch((error) => { this.setState({content: <Page>{`PageContent.fetchContent: unexpected rejection: ${error}`}</Page>}); });
  }

  render() {
    const content = this.state.content || <Loader />;
    return <PageRenderer {...this.props} content={content} />;
  }
}

PageContent.propTypes = {
  contentPromiseFn: PropTypes.func.isRequired
  // ^ A function which returns a Promise which returns a React Element
  // (which should be a <Page>).
};


export default PageContent;
