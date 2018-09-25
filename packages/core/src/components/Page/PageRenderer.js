import PropTypes from "prop-types";
import "raf/polyfill";

import React, { PureComponent } from "react";
import { catalogShape } from "../../CatalogPropTypes";
import Page from "./Page";
import runscript from "../../utils/runscript";

const renderStyles = styles => {
  return styles.map((src, i) => (
    <link key={i} href={src} rel="stylesheet" type="text/css" />
  ));
};

const renderContent = Content =>
  typeof Content === "string" ? <Page>{Content}</Page> : <Content />;

class PageRenderer extends PureComponent {
  constructor() {
    super();
    this.jump = this.jump.bind(this);
    this.jumpTimeout = null;
  }

  componentDidMount() {
    this.context.catalog.page.scripts.forEach(runscript);
    this.jump();
  }

  componentDidUpdate() {
    this.context.catalog.page.scripts.forEach(runscript);
    this.jump();
  }

  componentWillUnmount() {
    if (this.jumpTimeout !== null) {
      cancelAnimationFrame(this.jumpTimeout);
      this.jumpTimeout = null;
    }
  }

  jump() {
    const { location: { query: { a }, hash } } = this.props;

    // Hash is always defined, but may be an empty string. But the query param
    // is indeed optional and may be undefined. We do not want to be jumping
    // to the '#undefined' selector.

    if (hash !== "") {
      this.jumpToSelector(hash);
    } else if (a !== undefined && a !== "") {
      this.jumpToSelector(`#${a}`);
    }
  }

  jumpToSelector(selector) {
    if (this.jumpTimeout !== null) {
      cancelAnimationFrame(this.jumpTimeout);
      this.jumpTimeout = null;
    }

    // Don't freak out when hash is not a valid selector (e.g. #/foo)
    try {
      const el = document.querySelector(selector);
      if (el) {
        // Defer scrolling by one tick (when the page has completely rendered)
        this.jumpTimeout = requestAnimationFrame(() => {
          this.jumpTimeout = null;
          el.scrollIntoView();
        });
      }
    } catch (e) {
      // eslint-disable-line no-empty
    }
  }

  render() {
    const { content } = this.props;
    const { catalog: { page: { styles } } } = this.context;
    return (
      <div>
        {renderStyles(styles)}
        {renderContent(content)}
      </div>
    );
  }
}

PageRenderer.propTypes = {
  content: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  location: PropTypes.object.isRequired
};

PageRenderer.contextTypes = {
  catalog: catalogShape.isRequired
};

export default PageRenderer;
