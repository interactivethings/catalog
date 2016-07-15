/*

Modified react-frame-component@0.4.0 which supports an onRender callback (e.g. to measure contents);
Original https://github.com/ryanseddon/react-frame-component/

*/

import React, {Component, PropTypes} from 'react';
import {unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom'; // eslint-disable-line camelcase
import raf from 'raf';

const hasConsole = typeof window !== 'undefined' && window.console;
const noop = () => {};
let swallowInvalidHeadWarning = noop;
let resetWarnings = noop;

if (hasConsole) {
  const originalError = console.error; // eslint-disable-line no-console
  // Rendering a <head> into a body is technically invalid although it
  // works. We swallow React's validateDOMNesting warning if that is the
  // message to avoid confusion
  swallowInvalidHeadWarning = () => {
    console.error = (msg) => { // eslint-disable-line no-console
      if (/<head>/.test(msg)) return;
      originalError.call(console, msg);
    };
  };
  resetWarnings = () => {
    console.error = originalError; // eslint-disable-line no-console
  };
}

class FrameComponent extends Component {
  constructor() {
    super();
    this.renderFrameContents = this.renderFrameContents.bind(this);
  }

  componentDidMount() {
    this.renderFrameContents();
  }

  componentDidUpdate() {
    this.renderFrameContents();
  }

  componentWillUnmount() {
    const doc = this.iframe.contentDocument;
    if (doc) {
      unmountComponentAtNode(doc.body);
    }
  }

  renderFrameContents() {
    const doc = this.iframe.contentDocument;

    if (doc && doc.readyState === 'complete') {
      const contents = (
        <div>
          {this.props.head}
          {this.props.children}
        </div>
      );

      // React warns when you render directly into the body since browser
      // extensions also inject into the body and can mess up React.
      doc.body.innerHTML = '<div></div>';
      doc.head.innerHTML = '';

      const base = doc.createElement('base');
      base.setAttribute('href', window.location.href);
      doc.head.appendChild(base);

      // Clone styles from parent document head into the iframe, so components which use webpack's style-loader get rendered correctly.
      // This doesn't clone any Catalog styles because they are either inline styles or part of the body.
      const pageStyles = Array.from(document.querySelectorAll('head > style'));
      pageStyles.forEach((s) => {
        doc.head.appendChild(s.cloneNode(true));
      });

      swallowInvalidHeadWarning();
      renderSubtreeIntoContainer(this, contents, doc.body.firstChild, () => {
        if (this.props.onRender) {
          raf(() => {
            this.props.onRender(doc.body.firstChild);
          });
        }
      });
      resetWarnings();
    } else {
      setTimeout(this.renderFrameContents, 0);
    }
  }

  render() {
    const {style, frameBorder, allowTransparency, scrolling} = this.props;
    return (
      <iframe
        ref={(el) => { this.iframe = el; }}
        style={style}
        frameBorder={frameBorder}
        allowTransparency={allowTransparency}
        scrolling={scrolling} />
    );
  }
}

FrameComponent.propTypes = {
  style: PropTypes.object,
  head: PropTypes.node,
  onRender: PropTypes.func,
  children: PropTypes.node,

  // These props are passed through to the underlying <iframe>
  frameBorder: PropTypes.string,
  allowTransparency: PropTypes.string,
  scrolling: PropTypes.string
};

export default FrameComponent;
