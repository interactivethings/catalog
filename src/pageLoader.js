import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Loader from "./components/Page/Loader";
import PageRenderer from "./components/Page/PageRenderer";
import Page from "./components/Page/Page";
import requireModuleDefault from "./utils/requireModuleDefault";

const fetchMarkdown = url =>
  fetch(url, {
    credentials: "same-origin",
    headers: {
      Accept: "text/markdown, text/x-markdown, text/plain"
    }
  }).then(res => {
    if (res.status < 200 || res.status >= 300) {
      throw new Error(`Failed to load content from
      
\`${url}\`.
      
Reason: ${res.status} ${res.statusText}`);
    }
    return res.text();
  });

// The contents of the page when loading the page fails. 'msg' is the error
// string or message with additional details.
const errorMarkdown = msg => `
\`\`\`hint|warning
${msg}
\`\`\`
`;

class PageLoader extends PureComponent {
  constructor() {
    super();
    this.state = { content: null };
  }

  componentDidMount() {
    this.fetchPageContent();
  }

  fetchPageContent() {
    const { urlOrComponentPromise } = this.props;

    const contentPromise =
      typeof urlOrComponentPromise === "string"
        ? fetchMarkdown(urlOrComponentPromise).then(text => () => (
            <Page>{text}</Page>
          ))
        : urlOrComponentPromise().then(requireModuleDefault);

    contentPromise.then(
      content => {
        this.setState({ content });
      },
      err => {
        this.setState({ content: errorMarkdown(err.message) });
      }
    );
  }

  render() {
    const { location } = this.props;
    const Content = this.state.content || Loader;
    return Content.__catalog_loader__ === true ? (
      <Content location={location} />
    ) : (
      <PageRenderer location={location} content={Content} />
    );
  }
}

PageLoader.propTypes = {
  urlOrComponentPromise: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired
};

// eslint-disable-next-line react/display-name
export default urlOrComponentPromise => (
  { location } // eslint-disable-line react/prop-types
) => (
  <PageLoader
    location={location}
    urlOrComponentPromise={urlOrComponentPromise}
  />
);
