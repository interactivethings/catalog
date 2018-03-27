const loaderUtils = require("loader-utils");

module.exports = function loader() {};
module.exports.pitch = function pitch(remainingRequest) {
  const resource = loaderUtils.stringifyRequest(this, `!!${remainingRequest}`);
  this.cacheable && this.cacheable();

  const output = `
    var React = require('react');
    var createReactClass = require('create-react-class');
    var PageRenderer = require('catalog').PageRenderer;
    if (PageRenderer.__esModule) {
      PageRenderer = PageRenderer.default;
    }
    var WrappedPageRenderer = createReactClass({
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
        return React.createElement(PageRenderer, Object.assign({}, this.props, {content: this.state.content}));
      }
    });
    WrappedPageRenderer.__catalog_loader__ = true;
    module.exports = WrappedPageRenderer;
  `;

  return output;
};
