import React, {Component, PropTypes} from 'react';
import {catalogShape} from '../../CatalogPropTypes';
import Page from './Page';
import runscript from '../../utils/runscript';

const renderStyles = (styles) => {
  return styles.map((src, i) => <link key={i} href={src} rel='stylesheet' type='text/css' />);
};

const renderContent = (content) => React.isValidElement(content) && content.type === Page ? content : <Page>{content}</Page>;

class PageRenderer extends Component {
  componentDidMount() {
    this.context.catalog.page.scripts.forEach(runscript);
  }

  componentDidUpdate() {
    this.context.catalog.page.scripts.forEach(runscript);
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
  ]).isRequired
};

PageRenderer.contextTypes = {
  catalog: catalogShape.isRequired
};

export default PageRenderer;
