import React, {Component, PropTypes, createElement} from 'react';

import Loader from './components/Page/Loader';
import PageRenderer from './components/Page/PageRenderer';
import Page from './components/Page/Page';

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
      ? fetch(urlOrComponentPromise, {credentials: 'same-origin'}).then(res => res.text()).then(text => <Page>{text}</Page>)
      : urlOrComponentPromise().then(c => createElement(c));

    contentPromise
      .then((content) => { this.setState({content}); })
      .catch((content) => { this.setState({content}); });
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
