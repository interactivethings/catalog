import React, {Component, PropTypes} from 'react';
import {catalogShape} from '../../CatalogPropTypes';
import Page from './Page';
import runscript from '../../utils/runscript';

const renderStyles = (styles) => {
  return styles.map((src, i) => <link key={i} href={src} rel='stylesheet' type='text/css' />);
};

const renderContent = (content) => React.isValidElement(content) && content.type === Page ? content : <Page>{content}</Page>;

class PageRenderer extends Component {
  constructor() {
    super();
    this.jump = this.jump.bind(this);
  }

  componentDidMount() {
    this.context.catalog.page.scripts.forEach(runscript);
    this.jump();
  }

  componentDidUpdate() {
    this.context.catalog.page.scripts.forEach(runscript);
    this.jump();
  }

  jump() {
    const {location: {query: {a}, hash}} = this.props;
    const selector = hash || `#${a}`;
    clearTimeout(this.jumpTimeout);

    // Don't freak out when hash is not a valid selector (e.g. #/foo)
    try {
      const el = document.querySelector(selector);
      if (el) {
        // Defer scrolling by one tick (when the page has completely rendered)
        this.jumpTimeout = setTimeout(() => el.scrollIntoView(), 0);
      }
    } catch (e) {
      // eslint-disable-line no-empty
    }
  }

  render() {
    const {content} = this.props;
    const {catalog: {page: {styles}}} = this.context;
    return (
      <div>
        {renderStyles(styles)}
        {renderContent(content)}
      </div>
    );
  }
}

PageRenderer.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  location: PropTypes.object.isRequired
};

PageRenderer.contextTypes = {
  catalog: catalogShape.isRequired
};

export default PageRenderer;
