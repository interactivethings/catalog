/*

Modified react-frame-component@0.4.0 which supports an onRender callback (e.g. to measure contents);
Original https://github.com/ryanseddon/react-frame-component/

*/

import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';
import raf from 'raf';

var hasConsole = typeof window !== 'undefined' && window.console;
var noop = function() {}
var swallowInvalidHeadWarning = noop;
var resetWarnings = noop;

if(hasConsole) {
  var originalError = console.error;
  // Rendering a <head> into a body is technically invalid although it
  // works. We swallow React's validateDOMNesting warning if that is the
  // message to avoid confusion
  swallowInvalidHeadWarning = function() {
    console.error = function(msg) {
      if (/<head>/.test(msg)) return;
      originalError.call(console, msg);
    };
  };
  resetWarnings = function() {
    console.error = originalError;
  };
}

var Frame = React.createClass({
  propTypes: {
    style: React.PropTypes.object,
    head:  React.PropTypes.node,
    onRender: React.PropTypes.func
  },
  render: function() {
    // The iframe isn't ready so we drop children from props here. #12, #17
    return React.createElement('iframe', assign({}, this.props, {children: undefined}));
  },
  componentDidMount: function() {
    this.renderFrameContents();
  },
  renderFrameContents: function() {
    var doc = ReactDOM.findDOMNode(this).contentDocument;
    if(doc && doc.readyState === 'complete') {
      var contents = React.createElement('div',
        undefined,
        this.props.head,
        this.props.children
      );

      // React warns when you render directly into the body since browser
      // extensions also inject into the body and can mess up React.
      doc.body.innerHTML = '<div></div>';

      const base = doc.createElement('base');
      base.setAttribute('href', window.location.href);
      doc.head.appendChild(base);

      // Clone styles from parent document head into the iframe, so components which use webpack's style-loader get rendered correctly.
      // This doesn't clone any Catalog styles because they are either inline styles or part of the body.
      var pageStyles = Array.from(document.querySelectorAll('head > style'));
      pageStyles.forEach((s) => {doc.head.appendChild(s.cloneNode(true))});

      swallowInvalidHeadWarning();
      ReactDOM.render(contents, doc.body.firstChild, () => {
        if (this.props.onRender) {
          raf(() => {this.props.onRender(doc.body.firstChild)});
        }
      });
      resetWarnings();
    } else {
      setTimeout(this.renderFrameContents, 0);
    }
  },
  componentDidUpdate: function() {
    this.renderFrameContents();
  },
  componentWillUnmount: function() {
    var doc = ReactDOM.findDOMNode(this).contentDocument;
    if (doc) {
      ReactDOM.unmountComponentAtNode(doc.body);
    }
  }
});

export default Frame;