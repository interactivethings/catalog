const path = require('path');
const loaderUtils = require('loader-utils');

module.exports = function loader() {};
module.exports.pitch = function pitch(remainingRequest) {
  const resource = loaderUtils.stringifyRequest(this, `!!${remainingRequest}`);

  const output = `
    var React = require('react');
    var PageRenderer = require('${path.resolve(__dirname, 'components/Page/PageRenderer')}');
    if (PageRenderer.__esModule) {
      PageRenderer = PageRenderer.default;
    }
    module.exports = React.createClass({
      displayName: 'WrappedPageRenderer',
      getInitialState: function() {
        return {content: require(${resource})};
      },
      componentWillMount: function() {
        var component = this;
        if (module.hot) {
          module.hot.accept(${resource}, function() {
            component.setState({
              content: require(${resource})
            })
          })
        }
      },
      render: function() {
        return React.createElement(PageRenderer, {content: this.state.content});
      }
    });
  `;

  return output;
};
