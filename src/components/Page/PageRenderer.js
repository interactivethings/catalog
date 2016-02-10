import React, {Component, PropTypes} from 'react';
import CatalogPropTypes from '../../CatalogPropTypes';
import Page from './Page';
import runscript from '../../utils/runscript';

const renderStyles = (styles) => {
  return styles.map((src, i) => <link key={i} href={src} rel='stylesheet' type='text/css' />);
};

const renderContent = (content) => React.isValidElement(content) && content.type === Page ? content : <Page>{content}</Page>;

class PageRenderer extends Component {
  componentDidMount() {
    this.context.page.scripts.forEach(runscript);
  }

  componentDidUpdate() {
    this.context.page.scripts.forEach(runscript);
  }
  
  render() {
    const {content} = this.props;
    const {page: {styles}} = this.context;
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
  page: CatalogPropTypes.page.isRequired
};

export default PageRenderer;
