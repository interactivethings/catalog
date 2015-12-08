import React, {Component, PropTypes} from 'react';
import CatalogPropTypes from '../../CatalogPropTypes';
import runscript from '../../utils/runscript';

import MarkdownRenderer from '../../utils/MarkdownRenderer';

import Page from './Page';
import MarkdownSpecimen from '../Specimen/MarkdownSpecimen';

const seqKey = require('../../utils/seqKey')('cg-Page');

const renderStyles = (styles) => {
  return styles.map((src, i) => <link key={i} href={src} rel='stylesheet' type='text/css' />);
};

const renderContent = (content) => {
  if (React.isValidElement(content)) {
    return React.Children.only(content);
  }

  return (
    <Page>
      {MarkdownRenderer({
        text: content,
        renderer: {
          code: (body, options) => {
            return <MarkdownSpecimen key={seqKey()} body={body} options={options || ''} />;
          }
        }
      })}
    </Page>
  );
};

class PageRenderer extends Component {
  componentDidMount() {
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
