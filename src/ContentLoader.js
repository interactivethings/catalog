import React, {Component, createElement} from 'react';
import PropTypes from 'prop-types';

import Loader from './components/Page/Loader';
import PageRenderer from './components/Page/PageRenderer';
import Page from './components/Page/Page';

const fetchMarkdown = (url) =>
  fetch(url, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'text/markdown, text/x-markdown, text/plain'
    }
  })
  .then(res => {
    if (res.status < 200 || res.status >= 300) {
      throw new Error(`Failed to load content from
      
\`${url}\`.
      
Reason: ${res.status} ${res.statusText}`);
    }
    return res.text();
  });

// The contents of the page when loading the page fails. 'msg' is the error
// string or message with additional details.
const errorMarkdown = (msg) => `
\`\`\`hint|warning
${msg}
\`\`\`
`;


class ContentLoader extends Component {
  constructor() {
    super();
    this.state = {content: null};
  }

  componentWillMount() {
    this.fetchPageContent();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.urlOrComponentPromise !== this.props.urlOrComponentPromise) {
      this.fetchPageContent();
    }
  }

  fetchPageContent() {
    const {urlOrComponentPromise} = this.props;

    const contentPromise = typeof urlOrComponentPromise === 'string'
      ? fetchMarkdown(urlOrComponentPromise).then(text => <Page>{text}</Page>)
      : urlOrComponentPromise().then(c => createElement(c));

    contentPromise.then(
      (content) => { this.setState({content}); },
      (err) => { this.setState({content: <Page>{errorMarkdown(err.message)}</Page>}); });
  }

  render() {
    const content = this.state.content || <Loader />;
    return <PageRenderer {...this.props} content={content} />;
  }
}

ContentLoader.propTypes = {
  urlOrComponentPromise: PropTypes.any.isRequired
};

export default (urlOrComponentPromise) => (props) =>
  <ContentLoader {...props} urlOrComponentPromise={urlOrComponentPromise} />;
